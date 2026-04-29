const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const hpp = require('hpp');
const xss = require('xss-clean');
const { z } = require('zod');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const logger = require('./logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARES DE DEFESA PROFUNDA ────────────────────────

// 1. Cabeçalhos de Segurança Avançados
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

// 2. Prevenção de Poluição de Parâmetros HTTP
app.use(hpp());

// 3. Sanitização contra XSS (Cross-Site Scripting)
app.use(xss());

// 4. Configuração de CORS Restrita
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN || '*',
    methods: ['POST', 'GET'],
    allowedHeaders: ['Content-Type', 'X-Client-Signature']
}));

// 5. Limite de Tamanho de Payload (Prevenção DoS)
app.use(express.json({ limit: '10kb' }));

// ─── DECEPÇÃO E MONITORAMENTO (HONEYPOTS) ──────────────────

const honeypotPaths = [
    '/admin', '/wp-admin', '/config.php', '/.env', '/backup', '/phpmyadmin', '/v1/config'
];

app.use((req, res, next) => {
    if (honeypotPaths.some(path => req.path.includes(path))) {
        logger.warn('Honeypot Triggered! Tentativa de acesso a rota sensível.', {
            ip: req.ip,
            path: req.path,
            userAgent: req.get('user-agent'),
            method: req.method
        });
        // Devolvemos um erro falso ou apenas bloqueamos silenciosamente
        return res.status(404).send('Not Found');
    }
    next();
});

// ─── CONTROLE DE FLUXO (RATE LIMITING + SLOW DOWN) ─────────

// Slow Down: Aumenta o atraso da resposta conforme o número de requisições aumenta
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10, // Atrasar após 10 requisições
    delayMs: (hits) => hits * 100, // Adiciona 100ms de delay por requisição extra
});

// Rate Limit: Bloqueio total após o limite
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: 'Segurança: Limite de requisições excedido. Tente em 15 minutos.' },
    handler: (req, res, next, options) => {
        logger.warn('Rate Limit Excedido', { ip: req.ip });
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// ─── CONFIGURAÇÃO IA ──────────────────────────────────────

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatSchema = z.object({
    message: z.string().min(1).max(2000).trim()
});

// ─── ROTAS ────────────────────────────────────────────────

app.post('/api/chat', speedLimiter, apiLimiter, async (req, res) => {
    try {
        // Verificação de Integridade (Custom Header)
        if (req.get('X-Client-Signature') !== 'mohi-v1-auth') {
            logger.warn('Tentativa de acesso sem assinatura válida', { ip: req.ip });
            return res.status(403).json({ error: 'Acesso negado: Assinatura de cliente inválida.' });
        }

        const validation = ChatSchema.safeParse(req.body);
        if (!validation.success) {
            logger.info('Input inválido detectado', { ip: req.ip, data: req.body });
            return res.status(400).json({ error: 'Payload de mensagem inválido.' });
        }

        const { message } = validation.data;
        const result = await model.generateContent(message);
        const response = await result.response;
        
        logger.info('Sucesso no Chat', { ip: req.ip, length: message.length });
        res.json({ reply: response.text() });

    } catch (error) {
        logger.error('Erro crítico no servidor', { 
            message: error.message, 
            stack: error.stack,
            ip: req.ip 
        });
        res.status(500).json({ error: 'Erro interno protegido.' });
    }
});

// Rota de Health Check Avançado
app.get('/api/status', (req, res) => {
    res.json({ 
        status: 'Operacional', 
        security: 'Nível Máximo Ativo',
        timestamp: new Date().toISOString()
    });
});

// ─── INICIALIZAÇÃO ────────────────────────────────────────

app.listen(PORT, () => {
    logger.info(`🛡️ Servidor Protegido Iniciado na porta ${PORT}`);
    console.log(`
    ================================================
    🛡️  MOHI·AI SHIELD - BACKEND AVANÇADO
    ================================================
    🚀 Porta: ${PORT}
    🎯 Honeypots: Ativos
    🧪 Sanitização: Ativa (XSS, HPP, Zod)
    ⚡ Fluxo: SlowDown + RateLimit Ativos
    📝 Logs: Ativos em /logs/security-audit.log
    ================================================
    `);
});
