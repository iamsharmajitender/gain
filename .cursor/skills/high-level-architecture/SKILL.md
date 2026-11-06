---
name: high-level-architecture
description: >-
  Writes an unlisted high-level architecture companion under docs/architecture
  for an existing System Design insight: problem statement, assumptions, service
  diagram, per-service role / APIs / store keys, swim lanes per interaction,
  and failure points after swim lanes (load, RPS, and shed live in those
  tables). Adds one link from the parent insight only. Use when the user says
  "high-level architecture", "architecture companion", invokes
  /high-level-architecture or @high-level-architecture, or asks for a detailed
  architecture page for a system-design insight.
disable-model-invocation: true
---

# High-level architecture companion

Two-phase workflow. **Phase 1 proposes only — no files created.** Phase 2 runs after explicit **`approve`**.

This is not `write-insight`. Do not fatten the System Design essay. Do not create a listed insight card.

## Scope

**Parent required.** The parent must be an existing System Design insight (`system-design` topic tag) under `docs/insights/system-design/`. No parent, no companion.

**This site only.** Companion is an MDX page under **`docs/architecture/{slug}/`**. URL is **`/architecture/{slug}`**. Discovery is **one link on the parent insight**. Docusaurus docs cannot be `draft` and `unlisted` at once. While drafting: `draft: true` only. At publish (`@remove-draft`): drop `draft` and set `unlisted: true`. Never an Insights card, homepage tab, navbar item, docs sidebar entry, or sitemap section.

**Packet order is fixed** (these headings, this order):

1. Problem statement
2. Assumptions
3. Service diagram
4. Per-service role, APIs, and store keys
5. Swim lanes per interaction, with "what happens" on each step
6. Failure points (after swim lanes; includes load, RPS, memory, shed)

Section contracts: [reference.md](reference.md). Scaffold: [template.mdx](template.mdx). Shape rule: `.cursor/rules/architecture-companion.mdc`.

## Invoke

- **`@high-level-architecture`** — attach this skill, then name the parent insight
- **`/high-level-architecture`** — slash command

## Related rules

| Rule | Scope |
| --- | --- |
| `architecture-companion.mdc` | Frontmatter, six H2s, hero PNG, discovery |
| `site-image-chrome.mdc` | G.A.I.N mark top left + `jitendersharma.dev` bottom right on the hero PNG |
| `no-em-dash-content.mdc` | Prose in body, title, description |
| `collapsible-code-blocks-docs.mdc` | Fenced code → `<Details>` (not mermaid) |
| `mermaid-spacing-docs.mdc` | `<br/>` after every mermaid fence; color nodes with `classDef` |
| `no-links-to-draft-articles.mdc` | Published parent cannot link a draft companion |
| `docs-link-direction.mdc` | Insights may link to `/architecture/…`; architecture may link to its parent insight only |

**Companion skills:** `@write-insight` creates the parent essay. `@remove-draft` publishes. When publishing an architecture companion, remove `draft: true` and set `unlisted: true`. The only inbound link is the parent.

**Do not** put this packet in Insights, Blueprints, or Playbooks. **Do not** add a navbar item. **Do not** draw class diagrams or a swim lane per Redis command.

## Identify the parent

1. If the user `@` attached an insight or named a slug, use that.
2. Otherwise list `docs/insights/system-design/**/*.mdx` and ask which parent.
3. Refuse if the file has no `system-design` topic tag, or if it lives under `docs/architecture/`.

Record: parent **file path**, **slug**, **title**, **date**, **folder**, whether `draft: true`.

**Slug:** `{story-base}-architecture`. Strip a trailing `-system-design` from the parent slug before appending `-architecture`. Example: `virtual-waiting-room-system-design` → `virtual-waiting-room-architecture`.

**Folder:** `docs/architecture/{companion-slug}/`

**File:** `{companion-slug}.mdx` in that folder.

**PNG:** `{companion-slug}.png` in the same folder.

**URL:** `/architecture/{companion-slug}`.

Check collisions: grep `docs/architecture` and `docs/insights` for existing `slug:` / `id:` matching `{companion-slug}`. Skip `docs/architecture/index.mdx`.

---

## Phase 1 — Propose (no edits)

Read the parent MDX. Infer services, APIs, stores, and the request path from it. Do not invent a second product.

If the parent is too thin to fill APIs or store keys, ask **one** focused question, then continue the proposal.

### 1. Present the proposal report

Use this format exactly. **Do not create files.**

```markdown
## Proposed architecture companion: {title}

### Parent

| Field | Value |
| --- | --- |
| **Parent file** | `docs/insights/system-design/…/{parent-slug}.mdx` |
| **Parent slug** | `{parent-slug}` |
| **Parent URL** | `/insights/{parent-slug}` |
| **Parent status** | `draft: true` or published |

### Identity

| Field | Value |
| --- | --- |
| **Slug** | `{companion-slug}` |
| **URL** | `/architecture/{companion-slug}` |
| **Folder** | `docs/architecture/{companion-slug}/` |
| **File** | `{companion-slug}.mdx` |
| **Type** | Architecture companion |
| **Status** | `draft: true` (set `unlisted: true` only at publish) |

### Frontmatter

\`\`\`yaml
{full proposed frontmatter}
\`\`\`

### Section outline

1. `## Problem statement` — {one line}
2. `## Assumptions` — {N bullets, named}
3. `## Service diagram` — {nodes to show}
4. `## Per-service role, APIs, and store keys` — {service list}
5. `## Swim lanes per interaction` — {named interactions, client-visible path only}
6. `## Failure points` — {blast groups: melt the protected path, freeze a scarce pool, desync two planes, fairness; load/RPS/shed as rows in those groups}

### Parent link

| Field | Value |
| --- | --- |
| **Placement** | Parent MDX, immediately after `:::tip[THE CLAIM]` (before `<!-- truncate -->`) |
| **If companion will stay draft and parent is published** | plain text + "(coming soon)" |
| **Otherwise** | markdown below |

**Full architecture:** [services, APIs, store keys, and the request path](/architecture/{companion-slug})

### Hero PNG

| Field | Value |
| --- | --- |
| **Path** | `docs/architecture/{companion-slug}/{companion-slug}.png` |
| **Alt** | {short descriptive alt, no em dashes} |
| **Concept** | Service map of this system (not the parent essay metaphor) |
| **Chrome** | Baked into GenerateImage: G.A.I.N mark top left · jitendersharma.dev bottom right; empty padding in those corners |

### Checklist (will run in Phase 2)

- [ ] `docs/architecture/{companion-slug}/{companion-slug}.mdx` from [template.mdx](template.mdx)
- [ ] `draft: true` (do not also set `unlisted: true`)
- [ ] Six H2s in the required order
- [ ] One parent link only; no other inbound links
- [ ] Hero PNG generated with site chrome
- [ ] Mermaid: `<br/>` after fence; nodes colored
```

### 2. Stop and wait

End Phase 1 with:

**Reply `approve` to create the companion, or tell me what to change. Say `abort` to cancel with no files created.**

Do not create files on vague approval. Require **`approve`**.

---

## Abort / cancel

If the user says **`abort`**, **`cancel`**, **`quit`**, **`exit`**, or **`never mind`**:

1. Do not create or edit any file.
2. Confirm: *Architecture companion cancelled. No files were changed.*
3. End the workflow.

---

## Phase 2 — Create after approval

Only when the user sends **`approve`**.

1. **Create folder** `docs/architecture/{companion-slug}/` if it does not exist.
2. **Write** `{companion-slug}.mdx` from [template.mdx](template.mdx). Fill all six sections from [reference.md](reference.md). Import `Details` only if there are fenced code blocks.
3. **Generate hero PNG** with GenerateImage, `aspect_ratio: "16:9"`. Bake chrome per `site-image-chrome.mdc`. **filename:** `{companion-slug}.png`. Land it in `docs/architecture/{companion-slug}/`. Do not overlay or restamp.
4. **Add the parent link** (exact copy from Phase 1). If the parent is published and the companion is still `draft: true`, use the coming-soon form. Do not add links from any other page.
5. **Do not** add inbound links from G.A.I.N, blueprints, playbooks, other insights, or `docs/architecture/index.mdx`.
6. **Do not** add the companion to `sidebarsArchitecture.ts`.
7. **Summarize:** companion path, parent link, hero PNG path, what remains (publish via `@remove-draft`: drop `draft`, set `unlisted: true`).

Do not commit unless the user asks.

## Mermaid (service diagram and swim lanes)

Keep mermaid **visible**. After every closing fence, put `<br/>` on its own line.

Color every node with the G.A.I.N `classDef` palette (`mermaid-spacing-docs.mdc`):

| Role | Typical nodes | classDef |
| --- | --- | --- |
| Actor / input | Client, browser | `fill:#dbeafe,stroke:#93c5fd,color:#1e293b,stroke-width:2px` |
| Gate | api-gateway, WAF | `fill:#ffedd5,stroke:#fdba74,color:#1e293b,stroke-width:2px` |
| Process | Domain services | `fill:#ede9fe,stroke:#c4b5fd,color:#1e293b,stroke-width:2px` |
| Shared / platform | Redis, caches | `fill:#dcfce7,stroke:#86efac,color:#1e293b,stroke-width:2px` |
| Action / source | Inventory, payments, downstream | `fill:#fef3c7,stroke:#fcd34d,color:#1e293b,stroke-width:2px` |

Bare ` ```mermaid ` fence. No `gain-mermaid` wrapper. Optional HTML via the personal `diagram-design` skill only if the user asks; the MDX mermaid is required either way.
