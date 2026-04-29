const winston = require('winston');
const path = require('path');

// Configuração de formato para logs legíveis
const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
        logFormat
    ),
    transports: [
        // Log de Erros e Auditoria de Segurança
        new winston.transports.File({ 
            filename: path.join(__dirname, 'logs/security-audit.log'), 
            level: 'warn' 
        }),
        // Log geral
        new winston.transports.File({ 
            filename: path.join(__dirname, 'logs/combined.log') 
        }),
        // Saída no console para desenvolvimento
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        })
    ]
});

module.exports = logger;
