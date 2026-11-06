# Architecture companion packet

Read this in Phase 1 (to outline) and Phase 2 (to fill). Do not skip or reorder sections.

## Frontmatter

```yaml
id: {companion-slug}
slug: /{companion-slug}
title: "{Story}: High-level architecture"
description: "{One line: services, APIs, store keys, and the request path for this system.}"
draft: true
pagination_prev: null
pagination_next: null
```

Docusaurus docs cannot be `draft` and `unlisted` at once. While drafting, `draft: true` only. At publish, remove `draft` and set `unlisted: true`. Do not add insight `tags`, `authors`, `homepage`, or `date`.

## Open and close

After frontmatter:

1. Hero `![alt](./{companion-slug}.png)`
2. `# {title}`
3. One short paragraph: this page is the detailed architecture for the parent story. Link back:

**Parent insight:** [{parent title}](/insights/{parent-slug})

4. The six H2s (no `<!-- truncate -->`; this is not a blog post)
5. Close with the same parent back-link. No `:::tip[THE CLAIM]`, no `## Where I land`, no `## Key takeaways`.

## 1. Problem statement

What load, what scarce resource, what fails if every client hits the book path. Ground numbers in the parent insight when it has them. One short prose block, not a recap of the essay's metaphor.

## 2. Assumptions

Bullets. Each one must change the design if false. Typical: identity on enter, pass required at the gateway, admit rate tied to downstream capacity, shard strategy, sale window. Label unknowns as assumptions, not facts.

## 3. Service diagram

One mermaid `flowchart LR` (or `TB` if that fits). Nodes are **services and stores**, not classes.

Show the client-visible path as numbered edges when the parent has a 1-N request sequence. Include the gateway, each domain service, and each shared store.

No swim lanes here. That is section 5.

## 4. Per-service role, APIs, and store keys

One subsection per service (`### {service-name}`), in the order they appear on the diagram.

For each service, three blocks:

**Role.** One or two sentences. What it is allowed to decide. What it must not do.

**APIs.** Table. Client-facing first, then internal.

| Method | Path | Caller | Returns / effect |
| --- | --- | --- | --- |
| `POST` | `/room/enter` | ticket-web via api-gateway | `{ queueId, positionEstimate, pollAfterMs, state }` |

If the service exposes no public API (example: inventory called only by booking), say so and list the internal call.

**Store keys** (only if this service owns a store). Table of **structures**, named per id (`saleId`, shard, `queueId`). Not a seat inventory dump.

| Key / structure | Type | Holds | Operations |
| --- | --- | --- | --- |
| `sale:{saleId}:ticket` | string / `INCR` | Arrival ticket | Mint on enter |
| `sale:{saleId}:wait:{shard}` | sorted set | Waiters scored by ticket or lottery | Promote from head |
| `sale:{saleId}:q:{queueId}` | hash | Session, userId, expiry, state | Bind one wait |
| `sale:{saleId}:promoted` | string | Promotion cursor | ETA = ticket − cursor |

Gateway rows: routing and pass checks, not a store. Stores the waiting room does not own (booking DB, inventory counters) stay on those services.

## 5. Swim lanes per interaction

One mermaid `sequenceDiagram` per **client-visible interaction** (the parent's numbered path: enter, poll, admit, hold). Not one diagram per Redis command.

Under each diagram, a numbered list:

1. **Step name.** Who calls whom. What is read or written. What the client sees. Failure if this step is skipped.

Participants are services and stores from section 3. Internals (INCR, ZADD, TTL) belong in the step text, not as extra lanes.

Cap: the happy path plus the shed / expire / fall-closed turns that the parent already argues. Do not invent extra failure epics. Those belong in Failure points.

## 6. Failure points

Last H2. This is where the design dies under load or a skipped step. Do not add a second scaling table that retells the same rows.

Lead with one or two sentences: what melts the protected path, and that load (poll RPS, memory, shed, shards) lives in these tables too. Everything else is a pool leak, a two-plane desync, or fairness.

Then four `###` groups. Adapt the names to the parent (a ticket sale uses "Kill the sale"; a feed or checkout uses the equivalent protected path):

1. **Kill the protected path** (or Kill the sale). Include load rows that melt the origin: poll storm, uncapped room, catalogue stampede, live remaining on every poll, one giant list, admit tied to wall-clock open.
2. **Freeze the scarce pool** (or Freeze the line)
3. **Desync two planes** (inventory vs room, cache vs source, and so on)
4. **Fairness** (identity, refresh, UX that lies)

Each group is one table:

| Failure | Blast | How we handle | What remains |
| --- | --- | --- | --- |
| booking skips admission | 2M writers hit inventory | booking is the gate; fail closed | a second book path still kills the sale |

Include sweeper, TTL, complete-missed, gate, and load failures the swim lanes and parent already named. **What remains** is required: what still bites after the handle. Do not invent failure epics the parent and swim lanes do not imply.

Optional **Three clocks** (or equivalent) table when the design has more than one TTL or sweeper: clock, owner, if the loop dies.

## Parent link (the only inbound)

On the parent, immediately after `:::tip[THE CLAIM]`, before `<!-- truncate -->`:

```markdown
**Full architecture:** [services, APIs, store keys, and the request path](/architecture/{companion-slug})
```

If the parent is published and the companion is still `draft: true`:

```markdown
**Full architecture:** services, APIs, store keys, and the request path (coming soon)
```

Do not link the companion from any other insight, `docs/architecture/index.mdx`, tag page, homepage card, Blueprint, or Playbook.

## Out of scope

- Fattening the System Design essay with API tables
- A listed insight card, homepage tab, or navbar item
- Blueprints or Playbooks
- Class diagrams, ER diagrams, per-command Redis swim lanes
- Running this skill with no System Design parent
