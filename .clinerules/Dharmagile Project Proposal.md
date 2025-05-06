# Dharmagile AI — Project Proposal for Cursor AI‑Driven Development

> **Document purpose**  This proposal gives Cursor AI and collaborating agents the complete context needed to scaffold, implement, and iterate on the Dharmagile AI SaaS product. It captures business intent, functional scope, architecture, and an actionable six‑week MVP roadmap, with explicit development conventions for a Windows + VS Code environment.

---

## 1. Executive Summary

Dharmagile AI is a *Life‑Intelligence* (LI) platform that automatically structures every AI conversation into a goal‑oriented knowledge graph, helping users integrate personal growth, career projects, and daily reflections. The MVP targets Japanese knowledge workers (initially 100 k ChatGPT‑Plus–level users) and ships as a B2C subscription SaaS with a freemium tier.

---

## 2. Vision, Mission & Value

|                 | Statement                                                              |
| --------------- | ---------------------------------------------------------------------- |
| **Mission**     | "Turn generative‑AI into a partner for life design and self‑growth."   |
| **Vision**      | "Fragments of dialogue become a coherent, purpose‑driven life stream." |
| **Core Values** | Structured thinking · Purpose‑driven action · Continuous self‑growth   |

### Reality · Virtue · Capability (R‑V‑C)

| Aspect             | Key Points                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Reality (実)**    | AI chat histories are fragmented and hard to leverage; multi‑model use is rising; existing note tools lack purposeful structure. |
| **Virtue (徳)**     | Provide an ethical, user‑controlled LI tool that aligns with Buddhist principles (insight, compassion, non‑attachment).          |
| **Capability (能)** | Generate structured insights (JSON/YAML), visualize goal trees, and integrate multiple LLM APIs, starting with OpenAI.           |

---

## 3. Target Persona

30‑year‑old Japanese male, enterprise employee with side projects, growth‑oriented, heavy AI user, needs cross‑tool synthesis and project alignment.

---

## 4. Core Feature Set

### 4.1 MVP (6 weeks)

1. **Chat Ingestion & Storage** — Save every message pair (user ↔ AI) with metadata.
2. **Automatic Structuring** — GPT‑4‑turbo classifies each chat into *Purpose > Goal > Project > Task* hierarchy and stores `insight.yaml` per branch.
3. **Project Workspace** — Editable assistant instances scoped to a project.
4. **Dashboard v1** — Mermaid graphs + simple progress stats.
5. **Freemium Billing** — Stripe Checkout with Free / Pro / Premium plans.
6. **Auth** — Supabase email + social login.

### 4.2 Post‑MVP

* Conversation tree editing, search, and summarization.
* Kung‑fu *Kōtoku* points & compassion reactions.
* Wearable data hooks for mood/health.

---

## 5. Technical Architecture

| Layer           | Tech                                                     | Notes                                       |
| --------------- | -------------------------------------------------------- | ------------------------------------------- |
| **Frontend**    | Next.js 14, TypeScript, shadcn/ui, Tailwind CSS          | Hosted on Vercel.                           |
| **Backend API** | FastAPI (Python 3.12)                                    | Deployed on AWS Lambda or Cloud Run.        |
| **DB & Auth**   | Supabase (PostgreSQL)                                    | Row‑level security; `insight` JSONB column. |
| **LLM**         | OpenAI gpt‑4‑turbo (future: Claude, Gemini via adapters) | Keys stored in AWS Secrets Manager.         |
| **Payments**    | Stripe Checkout + webhooks                               | Plan tier recorded in `users.billing_plan`. |
| **Infra**       | Vercel (static/frontend) + AWS (API, worker, DB)         | IaC via Terraform later.                    |

### 5.1 High‑Level Flow

```
User → Next.js → FastAPI → (OpenAI, Supabase) → Webhooks → Frontend updates
```

---

## 6. Development Environment Conventions

* **OS** : Windows 10/11.
* **Editor** : VS Code with Cursor AI.
* **Terminal** : *VS Code Integrated Terminal* (PowerShell) — specify for all commands.
* **Node** : `lts/iron` via Volta.
* **Python** : `pyenv global 3.12.x`; virtualenv in `.venv`.
* **Package mgr** : pnpm 8.

---

## 7. Directory Blueprint (monorepo)

```
/ (root)
├─ apps/
│  ├─ web/          # Next.js frontend
│  └─ api/          # FastAPI backend
├─ packages/
│  ├─ ui/           # shadcn component library
│  └─ config/       # eslint, tsconfig, tailwind presets
├─ infra/           # IaC scripts (Terraform)
└─ docs/            # Architecture & INSIGHT templates
```

---

## 8. Six‑Week MVP Roadmap

| Week | Milestone (owner: dev‑pair)                                     |
| ---- | --------------------------------------------------------------- |
| 0    | Repo, CI, Vite → Next.js seed; Supabase project; Husky & Biome. |
| 1‑2  | **Auth** + **Chat UI v0** (Tabs/Dialog).                        |
| 2‑3  | **OpenAI integration** + `/generate`, `/structure` endpoints.   |
| 3    | CRUD chat persistence via React Router loaders/actions.         |
| 4    | Stripe Checkout & plan gating.                                  |
| 5    | Dashboard v1 (Mermaid static).                                  |
| 6    | Cloud Run deploy, closed β launch.                              |

---

## 9. API Contract Sketch

```yaml
POST /generate
  body:
    user_id: string
    messages: ChatCompletionMessage[]
    model: gpt-4o
  returns:
    completion: string

POST /structure
  body:
    conversation_id: string
  returns:
    insight_yaml: string  # stored verbatim
```

---

## 10. INSIGHT.yaml Template (Buddhist Framework)

```yaml
insight:
  title: <short problem title>
  timestamp: <YYYY-MM-DD>
  situation:
    context: <five aggregates lens>
    response: <three kamma lenses>
  four_noble_truths:
    dukkha: <suffering>
    samudaya: <cause>
    nirodha: <cessation image>
    magga: <path>
  dependencies:
    ignorance: <wrong view>
    craving: <tanha>
    attachment: <upadana>
  resolution:
    learning: <right view>
    new_action: <right effort>
    reminder: <mnemonic>
```

---

## 11. Security & Compliance

* HTTPS everywhere, HSTS via Vercel.
* Supabase RLS; JWT auth between FE ↔ BE.
* PCI DSS handled by Stripe; no card data stored.
* Personal data encrypted at rest.

---

## 12. Success Metrics (MVP)

| Metric                              | Target |
| ----------------------------------- | ------ |
| DAU (30 days post‑β)                | ≥ 500  |
| Retention (W2)                      | ≥ 40 % |
| Avg. structured chats / user / week | ≥ 15   |
| Stripe conversion (Free → Pro)      | ≥ 5 %  |

---

## 13. Next Steps for Cursor AI Agent

1. **Scaffold monorepo** using above blueprint.
2. Generate shadcn/ui component stubs for Chat UI and Dashboard.
3. Produce FastAPI routers for `/generate` and `/structure`.
4. Write Supabase schema SQL for `users`, `conversations`, `messages`, `insight` tables.
5. Configure Stripe test keys & webhooks.
6. Draft Mermaid diagrams in `/docs/`.

*End of proposal.*
