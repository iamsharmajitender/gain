---
name: remove-draft
description: >-
  Publish a draft insight by scanning docs/ for inbound link opportunities,
  presenting suggestions only, then applying changes after explicit user approval.
  Use when the user says "remove draft", "publish insight", "take out of draft",
  invokes /remove-draft or @remove-draft, or asks where links can be added after
  publishing an insight article.
disable-model-invocation: true
---

# Remove draft (publish insight + link suggestions)

## Invoke

- **`/remove-draft`** — slash command (`.cursor/commands/remove-draft.md`)
- **`@remove-draft`** — attach this skill in chat, then name the insight file or slug

On-demand workflow. **Never edit files in Phase 1.** Only suggest. Apply changes in Phase 2 after explicit user approval.

Related rule: `.cursor/rules/no-links-to-draft-articles.mdc` (why inbound links were blocked while draft).

## Phase 1 — Suggest only (no edits)

### 1. Identify the target article

- If the user names a file or slug, use that insight.
- Otherwise list `docs/insights/**/*.mdx` with `draft: true` and ask which to publish (or publish all if they said so).

Record: **file path**, **slug**, **title**, **tags**, **description**, article type (from `insights-article-structure` rule).

### 2. Scan `docs/` for link opportunities

Search the whole `docs/` tree (insights, playbooks, blueprints, frameworks). Grep for:

| Signal | Example |
| --- | --- |
| Plain-text stand-in | `*Title* (coming soon)`, title without `[...](/insights/slug)` |
| Slug or title mention | article title, "companion piece", "deep dive", "see also" |
| Topic overlap | same tags, same framework (PGAR, eval, intent router, agentic loop) |
| Paired articles | primer ↔ design guide, parent ↔ deep dive (e.g. how-llm ↔ before-training) |
| `:::info[Builds on]` | natural slot for the new insight |
| Draft-to-draft links | other drafts already link to this slug (candidates once published) |

**Only suggest links from pages that will be published** (no `draft: true` on the source file). Skip linking *into* other draft insights unless the user also publishes those.

### 3. Present the suggestion report

Use this format exactly. Do **not** remove `draft: true` yet.

Put **all** link suggestions in **one table** (High, Medium, and Optional together). Sort by priority **High → Medium → Optional**, then assign **`#`** 1, 2, 3… in that order. Do not use separate bullet lists for optional items.

```markdown
## Publish: [title] (`/insights/[slug]`)

### Insight

| Field | Value |
| --- | --- |
| **Target file** | `docs/insights/.../[slug].mdx` |
| **Slug** | `[slug]` |
| **Title** | [title] |
| **Type** | [article type from insights-article-structure] |
| **Tags** | [comma-separated tags] |
| **Description** | [frontmatter description, truncated if long] |

### Suggested inbound links

| # | Priority | Source file | Line / section | Current text | Suggested change |
| --- | --- | --- | --- | --- | --- |
| 1 | High | `docs/.../foo.mdx` | Stage 1 / Builds on | plain text "(coming soon)" | `[Title](/insights/slug)` |
| 2 | Medium | `docs/.../bar.mdx` | … | … | … |
| 3 | Optional | `docs/.../baz.mdx` | … | … | … |

Include draft-only sources (already link to this slug but source is still draft) as numbered rows at the bottom with Priority **Draft source** and a note in **Suggested change** that the link exists but has no build impact until that source is published.

If there are no suggestions, say so and leave the table with headers only or a single row: `| — | — | — | — | — | No inbound link opportunities found |`.

### Recommended publish steps (pending your approval)

1. Remove `draft: true` from `[target file]`
2. Apply the link updates for the **#** rows you approve
3. Run `npm run build` to verify `onBrokenLinks`
```

Rank **High** when: explicit plain-text placeholder, named companion/deep-dive, or parent article already describes this piece.

Rank **Medium** when: topical fit but no existing placeholder.

Rank **Optional** when: stretch / nice-to-have cross-ref.

Rank **Draft source** when: another draft already links here (informational only).

### 4. Stop and wait

End Phase 1 with:

**Reply with the row numbers to apply (e.g. `1`, `1 and 2`, `none` for publish-only with no link updates, or `abort` / `quit` / `exit` / `cancel` to stop with no changes). I will remove draft and update only the rows you list.**

Do not accept vague approval alone ("yes", "go ahead", "apply all High") unless the user also lists numbers or says **all** / **all rows** to apply every numbered row in the table.

Do not commit, do not remove draft, do not add links until the user provides row numbers (or explicit **all rows**).

## Abort / cancel (no changes anywhere)

If the user says **`abort`**, **`quit`**, **`exit`**, **`cancel`**, **`stop`**, or **`never mind`** (any casing) at any point after Phase 1 starts:

1. **Do not edit any file** — no draft removal, no link updates, no commits.
2. Confirm briefly: *Publish cancelled. No files were changed.*
3. End the workflow. Do not re-run Phase 2 unless the user starts `/remove-draft` again.

**`none`** / **`publish only`** is **not** abort: those still remove `draft: true` and run build (Phase 2 without link rows).

## Phase 2 — Apply after explicit approval

Only run when the user provides **row numbers** from the Phase 1 table (e.g. `1`, `1, 3`, `all rows`) or **`none`** / **`publish only`** for draft removal with no link changes.

**Do not run Phase 2** if the user sent an abort keyword (see above).

1. **Remove draft** from the target insight frontmatter (`draft: true` line or set `draft: false`).
2. **Apply only the numbered rows** the user listed. Skip **Draft source** rows unless the user included those numbers (they are informational by default).
3. **Do not** apply rows the user omitted.
4. Run `npm run build` (or report if build cannot run).
5. Summarize: draft removed, which **#** rows were applied, build status.

If the user replied **`none`** or **`publish only`**, remove draft and run build without link edits.

## Link text conventions

- Use `[Title](/insights/slug)` — slug from target frontmatter, not folder name.
- Prefer replacing `(coming soon)` placeholders over adding redundant links.
- Follow `no-em-dash-content` for new prose; do not edit `slug:` or `image:` paths unnecessarily.
- One link per logical mention; do not spam the same URL in one section.

## Example trigger

User: `@before-training-an-llm remove draft`

Agent Phase 1: numbered table; row 1 High = `how-llm-work-under-the-hood.mdx` line 66 placeholder → ask for row numbers.

User: `1`

Agent Phase 2: remove `draft: true`, apply row 1 only, run build.

User: `abort`

Agent: confirm *Publish cancelled. No files were changed.* — no edits.
