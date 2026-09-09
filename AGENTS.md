<!-- spell-checker:ignore () dxx Deno dprint opencode Codex -->

# AGENTS

`dxx` — enhanced Deno commands (`dxf`, `dxi`, `dxr`, `dxx`) and the `xProcess` library. Deno + TypeScript. Primary development/target platform is Windows, but code must stay cross-platform (Windows / macOS / Linux).

## Essential commands

- Test: `deno test -A` (or `deno task test` for colorized output)
- Lint: `deno lint`
- Format: `dprint fmt` (check-only: `dprint check`)
- Style/syntax gate (CI): `deno test -A tests/00.project.style.test.ts tests/00.project.syntax.test.ts`

Run the style gate before committing; it enforces formatting, lint, spelling, commit-message rules, LF newlines, trailing-newline, and no-trailing-whitespace.

## Read `.agents/` for the rest

To keep the repo root minimal, all agent-facing guidance lives in [`.agents/`](.agents/) rather than in more root-level files. **Any agent — Codex, opencode, Claude Code, Cursor, etc. — should treat the files under `.agents/` as part of these instructions and consult the relevant one before working:**

- [`.agents/guide.mkd`](.agents/guide.mkd) — setup, dev workflows, coding conventions, gotchas
- [`.agents/commits.mkd`](.agents/commits.mkd) — commit message rules and style (**read before committing**)
- [`.agents/architecture.mkd`](.agents/architecture.mkd) — directory map and key modules
- [`.agents/skills/`](.agents/skills/) — task recipes; scan the index and follow one when it fits the task
- [`.agents/tools/`](.agents/tools/) — custom tool/command definitions
- [`.agents/commands/`](.agents/commands/) — reusable prompts

These directories are plain repo files, not tool-specific config; do not create `.claude/`, `.opencode/`, or similar. `CLAUDE.md` exists only to redirect Claude Code here. See [`.agents/README.mkd`](.agents/README.mkd) for how this is wired per agent.

## Markdown

Use the `.mkd` extension for Markdown files (repo convention). The three discovery files that tools require by exact name — `AGENTS.md`, `CLAUDE.md`, `README.md` — keep `.md`.
