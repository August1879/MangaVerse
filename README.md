# MangaVerse - Minimal Preview Package

This is a minimal preview scaffold of the MangaVerse project (Next.js + Prisma + SQLite).
It is intended for quick local testing.

## Quick start

```bash
# 1. install deps
npm install

# 2. generate prisma client and migrate (creates SQLite dev.db)
npx prisma generate
npx prisma migrate dev --name init --create-only
npx prisma db push

# 3. seed (creates demo user and works)
npm run db:seed

# 4. run dev
npm run dev
# open http://localhost:3000
```

Environment:
- Uses SQLite at `./dev.db` by default (configured in prisma/schema.prisma).
- For production, replace with PostgreSQL and adjust `DATABASE_URL`.

