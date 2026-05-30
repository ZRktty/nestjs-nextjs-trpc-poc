# tRPC Todo — Monorepo PoC

**Stack:** NestJS v11 · Next.js 15 · tRPC v11 · nestjs-trpc · pnpm workspaces · Turborepo

## Structure

```
trpc-todo/
├── apps/
│   ├── backend/          # NestJS (port 4000)
│   └── frontend/         # Next.js (port 3000)
├── packages/
│   └── trpc-contract/    # Shared Zod schemas & types
├── turbo.json
└── pnpm-workspace.yaml
```

## Quick Start

```bash
# Install deps
pnpm install

# Run both apps in parallel
pnpm dev
```

## How it works

1. **nestjs-trpc** decorators (`@Router`, `@Query`, `@Mutation`) on `TodoRouter` auto-generate the `AppRouter` type + schema file
2. The generated `AppRouter` is imported by the frontend for end-to-end type safety — no manual type sharing needed
3. The shared `@repo/trpc-contract` package holds Zod schemas used on both sides

## Routes

| Method   | Procedure          | Description      |
|----------|--------------------|------------------|
| Query    | `todos.getAll`     | List all todos   |
| Mutation | `todos.create`     | Create a todo    |
| Mutation | `todos.update`     | Update title/status |
| Mutation | `todos.delete`     | Delete a todo    |

## Notes

- Backend uses an in-memory store (no DB) — replace `TodoService` with Prisma/TypeORM for persistence
- CORS is pre-configured for `localhost:3000`
- The `@generated` folder is produced by `nestjs-trpc` on first backend start — commit or gitignore per preference
