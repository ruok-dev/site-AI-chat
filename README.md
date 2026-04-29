# mohi·ai — Secure AI Chat Portfolio

A high-performance, dark-themed AI chat interface with an advanced, enterprise-grade security backend. This project demonstrates best practices in frontend design and backend security.

## 🛡️ Security Features (Defense-in-Depth)

- **Deception (Honeypots)**: Decoy routes to detect and log intrusion attempts.
- **Advanced Rate Limiting**: Progressive delay (SlowDown) and hard blocking to prevent DoS/DDoS.
- **Structured Audit Logging**: Professional logging with Winston for traceability.
- **Security Headers**: Hardened with Helmet (CSP, HSTS, etc.).
- **Input Sanitization**: Deep cleansing with XSS-Clean, HPP, and Zod validation.
- **Proxy Architecture**: API keys are protected on the server side and never exposed to the client.

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, Javascript (ES6+).
- **Backend**: Node.js, Express.
- **AI**: Google Gemini AI.

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ruok-dev/site-AI-chat.git
   cd site-AI-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your `GEMINI_API_KEY`

4. Start the server:
   ```bash
   npm start
   ```

## 📄 License

MIT

---
Developed for portfolio purposes.
