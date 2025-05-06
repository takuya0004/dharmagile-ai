# Dharmagile AI — Development Roadmap & Milestones

*Document status : Draft v1.2  |  Updated : 2025‑05‑04  |  Author : Cursor AI agent*

---

## Overview

This roadmap translates the 6‑week MVP plan into concrete, time‑boxed milestones and deliverables. All tasks are executed **jointly** by the human developer and the Cursor‑powered AI agent, so no distinct "Lead" or "Support" roles are listed. All dates use **Asia/Tokyo (UTC+9)**.

| Phase                             | Week (2025)                | Key Objectives                                                                                                                                      | Major Deliverables                                                                                                                            |
| --------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **0 — Preparation & Environment** | Week 1 〈May 5 – May 11〉    | • Repo & CI setup<br>• Dev environment standardization<br>• Initial Supabase project                                                                | ▸ GitHub repo with Biome/Husky/Lint‑Staged<br>▸ VS Code workspace & PowerShell profiles<br>▸ Supabase project (Auth + DB schema v0)           |
| **1 — MVP Core Features**         | Week 2‑3 〈May 12 – May 25〉 | • Auth (Better Auth wrapper + Supabase social auth)<br>• Basic Chat UI (shadcn Tabs/Dialog)<br>• FastAPI routes `/generate`,`/structure`,`/insight` | ▸ Auth screens & JWT flow<br>▸ Chat page (static tree placeholder)<br>▸ OpenAI integration (gpt‑4‑turbo)<br>▸ Unit tests (pytest, Playwright) |
| **2 — Subscription & Billing**    | Week 4 〈May 26 – Jun 1〉    | • Stripe Checkout (Basic / Pro)<br>• Webhook to Supabase `users.billing_plan`<br>• Feature gating in React                                          | ▸ Checkout modal<br>▸ Webhook endpoint & local tunnel config<br>▸ Plan enforcement hooks                                                      |
| **3 — Dashboard & Reflection**    | Week 5 〈Jun 2 – Jun 8〉     | • Static dashboard skeleton (Mermaid graph placeholder)<br>• Insight.yaml CRUD in DB<br>• Chat categorization filters                               | ▸ Dashboard route `/dashboard`<br>▸ Mermaid sample graph<br>▸ Supabase RPC for YAML fetch/update                                              |
| **4 — Deploy & Closed β**         | Week 6 〈Jun 9 – Jun 15〉    | • Docker multi‑stage build (Vite + FastAPI)<br>• Cloud Run deploy<br>• Closed beta onboarding docs                                                  | ▸ `docker-compose.yml` + Cloud Build<br>▸ Staging environment URL<br>▸ Beta tester feedback form                                              |

---

## Milestone Acceptance Criteria

1. **MVP ready** (Jun 15) — All Phase 0‑4 deliverables pass CI; staging URL live; at least 3 beta users complete signup → chat → dashboard flow.
2. **Payment live** — Stripe test mode transactions recorded; plan upgrade toggles features immediately.
3. **Insight storage** — Chat‑to‑YAML conversion stored, retrievable, and displayed on dashboard.

---

## Risk & Mitigation

| Risk                     | Impact                | Likelihood | Mitigation                                                                |
| ------------------------ | --------------------- | ---------- | ------------------------------------------------------------------------- |
| Supabase outage          | Data access blocked   | Medium     | Enable local Postgres fallback for dev; nightly DB export.                |
| OpenAI quota             | Chat fails            | High       | Monitor usage; implement gpt‑3.5‑turbo fallback tier.                     |
| Stripe compliance delays | Payment go‑live slips | Low        | Start KYB verification early in Phase 2; prepare manual invoice fallback. |

---

## Post‑MVP Roadmap (High‑level)

1. **Phase 5 — Tree‑based Chat & YAML Branch Export** (Jun‑Jul 2025)
2. **Phase 6 — Real‑time Mermaid Graph Generation**
3. **Phase 7 — Wearable Device Integration PoC**

---

*End of document*
