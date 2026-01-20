# Security Checklist (Initial)

- Enforce server-side RBAC and tenant isolation for all data writes.
- Use Argon2id for password hashing and rotate session secrets.
- Add CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers.
- Encrypt sensitive tokens at rest with rotation-ready KMS-like key management.
- Use signed URLs for private video and file access with short TTLs.
- Implement audit logs with PII redaction.
- Validate all inputs with Zod on write routes and apply rate limiting.
- Verify Stripe and WhatsApp webhooks with signature checks.
- Support GDPR data export and deletion flows.
