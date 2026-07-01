# Kawichchi Premium Furniture

## Local Development

1. Copy `.env.example` to `.env.local`.
2. Replace `MONGODB_URI` with your real MongoDB connection string.
3. Do not commit `.env.local` — it is ignored by Git for security.

## Production / Deployment

- Add `MONGODB_URI` and `MONGODB_DB_NAME` in your deployment environment settings.
- Do not store production secrets in the repository.

## Notes

- `.env.local` is intentionally excluded via `.gitignore`.
- That means your local MongoDB credentials remain private and will not be pushed to GitHub.
