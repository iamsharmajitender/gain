# AGENTS.md

Cursor-focused brief for this repo. Skills and rules under `.cursor/` are the source of truth — not this file.

## Layout

| Path | Role |
|------|------|
| `.cursor/rules/agent-skills.mdc` | Always-on skill routing |
| `.cursor/skills/<name>/SKILL.md` | Workflows (edit in place) |
| `.cursor/commands/` | Slash commands (`/spec`, `/plan`, …) |
| `.cursor/agents/` | Optional review personas |
| `.cursor/references/` | Checklists skills may load |

## Core rules

- If a skill matches the task, read and follow it before implementing.
- Start with `.cursor/skills/using-agent-skills/SKILL.md` when unsure which skill applies.
- Do not invent process that already exists as a skill.
- Prefer extending an existing skill over adding a near-duplicate. Format: [skill-anatomy.md](https://github.com/addyosmani/agent-skills/blob/main/docs/skill-anatomy.md).

## Intent → command

| Intent | Command |
|--------|---------|
| Define what to build | `/spec` |
| Plan how to build it | `/plan` |
| Build incrementally | `/build` |
| Prove it works | `/test` |
| Review before merge | `/review` |
| Audit web performance | `/webperf` |
| Simplify the code | `/code-simplify` |
| Ship to production | `/ship` |

## Intent → skill (quick map)

- New feature / unclear requirements → `spec-driven-development` (then plan / implement / TDD)
- Planning → `planning-and-task-breakdown`
- Bug / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- UI → `frontend-ui-engineering`
- API / boundaries → `api-and-interface-design`
- Ship → `shipping-and-launch`

Full catalog: [README.md](README.md).
