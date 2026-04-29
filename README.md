# ✧ mohi·ai — Design-Driven AI Experience

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Aesthetics_%26_UI-E8E4DC?style=for-the-badge&logoColor=0c0c0c" alt="Focus: Design" />
  <img src="https://img.shields.io/badge/Backend-Security_Shield-black?style=for-the-badge&logo=node.js" alt="Backend: Secure" />
  <img src="https://img.shields.io/badge/Frontend-Vanilla_Perfection-white?style=for-the-badge&logo=javascript" alt="Frontend: Vanilla" />
</p>

---

## ✦ O Conceito
**mohi·ai** não é apenas mais um chat de IA; é um experimento de **excelência visual e design de interação**. O objetivo primordial deste projeto é demonstrar como a estética minimalista, combinada com animações fluidas e uma arquitetura de segurança invisível, pode elevar a experiência do usuário a um patamar premium.

> [!TIP]
> **Nota de Portfólio**: O foco principal deste projeto é o **Design e a Experiência do Usuário (UX/UI)**. A funcionalidade de chat serve como o palco para demonstrar interações complexas e um sistema de segurança de backend de nível profissional.

---

## 🎨 Design Showcase

O projeto explora conceitos de design moderno, inspirados em interfaces de alta fidelidade e minimalismo suíço:

- **Custom Cursor & Trail**: Uma experiência de navegação imersiva com um sistema de rastro em partículas que reage ao movimento do mouse.
- **Glassmorphism & Surfaces**: Uso de camadas semitransparentes e bordas sutis para criar profundidade sem ruído visual.
- **Typography-First**: Foco nas fontes *Geist* e *DM Sans* para garantir legibilidade e sofisticação.
- **Micro-interações**: Hover effects suaves, animações de entrada (fade-up) e estados de carregamento organicamente integrados.
- **Dark Mode "True Black"**: Paleta de cores cuidadosamente selecionada para reduzir o cansaço visual e destacar os elementos de acento.

---

## 🛡️ Arquitetura de Segurança (The Invisible Shield)

Apesar do foco em design, o backend foi construído com uma mentalidade de **Segurança Máxima** para garantir que o projeto seja robusto e pronto para produção:

- **Honeypotting**: Armadilhas para bots em rotas sensíveis (`/admin`, `.env`).
- **Progressive SlowDown**: Sistema de defesa que atrasa requisições suspeitas para frustrar ataques de força bruta.
- **Structured Audit Logs**: Monitoramento em tempo real de eventos de segurança via Winston.
- **Fingerprinting**: Validação de integridade entre Frontend e Backend via headers customizados.
- **Sanitização de Elite**: Blindagem contra XSS, HPP e injeção de dados via Zod.

---

## 🛠️ Stack Tecnológica

### Frontend
- **HTML5/CSS3**: Estrutura semântica e estilização Vanilla para controle absoluto.
- **Javascript (ES6+)**: Lógica de animação e integração de partículas.
- **Google Fonts**: Tipografia moderna (Geist & DM Sans).

### Backend
- **Node.js & Express**: Servidor de alta performance.
- **Google Gemini AI**: O motor de inteligência por trás da interface.
- **Winston**: Logs de auditoria estruturados.
- **Helmet & Rate-Limit**: Proteção de cabeçalhos e controle de tráfego.

---

## 🚀 Como Iniciar a Experiência

1. **Clone o universo**:
   ```bash
   git clone https://github.com/ruok-dev/site-AI-chat.git
   cd site-AI-chat
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure sua Identidade**:
   - Renomeie `.env.example` para `.env`
   - Adicione sua `GEMINI_API_KEY` obtida no [Google AI Studio](https://aistudio.google.com/app/apikey).

4. **Lance o sistema**:
   ```bash
   npm start
   ```

---

## ⚖️ Licença
Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

<p align="center">
  Criado com paixão por design e segurança por [Seu Nome/GitHub]
</p>
