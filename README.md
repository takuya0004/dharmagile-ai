# Dharmagile AI Monorepo

Dharmagile AI is a Life-Intelligence SaaS platform that structures every AI conversation into a goal-oriented knowledge graph, supporting personal growth and project management.

## Monorepo Structure

```
/
├─ apps/
│  ├─ web/          # Next.js frontend
│  └─ api/          # FastAPI backend
├─ packages/
│  ├─ ui/           # shadcn component library
│  └─ config/       # eslint, tsconfig, tailwind presets
├─ infra/           # IaC scripts (Terraform)
└─ docs/            # Architecture & INSIGHT templates
```

## Tech Stack

- Frontend: Next.js 14, TypeScript, shadcn/ui, Tailwind CSS
- Backend: FastAPI (Python 3.12)
- DB/Auth: Supabase (PostgreSQL)
- LLM: OpenAI gpt-4-turbo
- Payments: Stripe Checkout
- Infra: Vercel (FE), AWS (API/DB), Terraform

## Development

- Node: lts/iron via Volta
- Python: pyenv 3.12.x, .venv per project
- Package manager: pnpm 8
- Editor: VS Code + Cursor AI

See `.clinerules/` for functional specs and roadmap.
