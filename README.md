# tRPC Todo — Monorepo PoC

**Stack:** NestJS v11 · Next.js v16 · tRPC v11 · nestjs-trpc v2.9.1 · Zod v4 · TypeScript 6 · pnpm workspaces · Turborepo

→ **[Step-by-step tutorial + production readiness analysis](TUTORIAL.md)**

---

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

# Generate the AppRouter type (required once before frontend compiles)
pnpm generate

# Run both apps in parallel
pnpm dev
```

## How it works

1. **nestjs-trpc CLI** (`nestjs-trpc generate`) statically analyses `*.router.ts` files and emits `src/@generated/server.ts` — no NestJS bootstrap required
2. The generated `AppRouter` type is imported by the frontend for end-to-end type safety — no manual type sharing needed
3. The shared `@repo/trpc-contract` package holds Zod v4 schemas used by both apps

```text
@repo/trpc-contract  ──►  apps/backend  ──[CLI]──►  @generated/server.ts
        │                                                     │
        └─────────────────────────────────────────────────────►  apps/frontend
```

## Routes

| Method   | Procedure          | Description         |
|----------|--------------------|---------------------|
| Query    | `todos.getAll`     | List all todos      |
| Mutation | `todos.create`     | Create a todo       |
| Mutation | `todos.update`     | Update title/status |
| Mutation | `todos.delete`     | Delete a todo       |

## Notes

- Backend uses an in-memory store (no DB) — replace `TodoService` with Prisma/TypeORM for persistence
- CORS is pre-configured for `localhost:3000`
- `apps/backend/src/@generated/` is gitignored — run `pnpm generate` (or `pnpm dev`) to recreate it
- See [TUTORIAL.md](TUTORIAL.md) for a full build walkthrough and production readiness analysis
