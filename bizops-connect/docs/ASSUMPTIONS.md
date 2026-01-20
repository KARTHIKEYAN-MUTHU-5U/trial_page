# Assumptions

1. The existing Vite + React single-page app is used as the starting point for the marketing experience. The full Next.js + backend migration is planned as a phase-2 milestone due to the current repository structure.
2. The marketing homepage is delivered as a public route (`/marketing`) while authenticated app modules remain gated behind login.
3. Brand placeholder values (`YOUR_BRAND`, `yourdomain.com`, `support@yourdomain.com`) remain configurable and will be migrated to environment-driven configuration in the backend phase.
4. Data persistence, payments, email, and WhatsApp API connections are represented as feature placeholders until the backend services are implemented.
5. Visual animation requirements are implemented using lightweight CSS motion and respect `prefers-reduced-motion` to preserve performance in the current stack.
