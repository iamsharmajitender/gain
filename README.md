# architects-handbook

Personal site and handbook for [jitendersharma.dev](https://jitendersharma.dev): built with [Docusaurus 3](https://docusaurus.io/).

**Source:** `main` branch · **Live site:** `gh-pages` branch (GitHub Pages)

## Prerequisites

- Node.js **20+** (`package.json` engines)
- npm
- Git remote: `git@github.com:iamsharmajitender/architects-handbook.git`
- SSH access to GitHub (for `npm run deploy`)

## Install

```bash
npm install
```

## Local development

Start the dev server (default: [http://localhost:3000](http://localhost:3000)):

```bash
npm start
```

Most edits hot-reload. A custom plugin clears Docusaurus and webpack caches automatically before each `npm start` to avoid stale builds.

### Preview production build locally

```bash
npm run build
npm run serve
```

`serve` hosts the contents of `build/` (default: [http://localhost:3000](http://localhost:3000)).

### Typecheck

```bash
npm run typecheck
```

## Clean local artifacts

If the dev server behaves oddly or builds look stale, clear caches and output:

```bash
# Docusaurus cache (recommended first step)
npm run clear

# Full local clean: build output + caches
rm -rf build .docusaurus node_modules/.cache
```

Nuclear option (reinstall dependencies):

```bash
rm -rf node_modules build .docusaurus node_modules/.cache
npm install
```

## Site structure (quick reference)

| Path | Purpose |
| --- | --- |
| `docs/frameworks/` | G.A.I.N framework docs (`/frameworks`) |
| `docs/insights/` | Insights blog posts (`/insights`) |
| `src/pages/` | About, Advisory, Sitemap, homepage |
| `static/CNAME` | Custom domain (`jitendersharma.dev`) |

## Git workflow: `main` vs `gh-pages`

| Branch | Role |
| --- | --- |
| **`main`** | Source code: edit here, commit, push |
| **`gh-pages`** | Built static HTML. updated by deploy, not edited by hand |

### Push source changes to `main`

```bash
git checkout main
git pull origin main

# edit, then:
git add .
git commit -m "Describe your change"
git push origin main
```

Pushing `main` does **not** update the live site. Deploy separately (below).

## Deploy to jitendersharma.dev

Production is [GitHub Pages](https://pages.github.com/) on the **`gh-pages`** branch with custom domain **`jitendersharma.dev`**.

Config (`docusaurus.config.ts`):

- `url`: `https://jitendersharma.dev`
- `organizationName`: `iamsharmajitender`
- `projectName`: `architects-handbook`
- `deploymentBranch`: `gh-pages`

`static/CNAME` contains `jitendersharma.dev` and is copied into the build output on deploy.

### Deploy command

From `main`, with a clean working tree recommended:

```bash
npm run build    # optional but good to verify before deploy
npm run deploy
```

`npm run deploy` runs `docusaurus deploy`, which:

1. Builds the site into `build/`
2. Commits the build to the **`gh-pages`** branch
3. Pushes **`gh-pages`** to `origin` (uses SSH: `USE_SSH=true`)

The live site at [https://jitendersharma.dev](https://jitendersharma.dev) updates after GitHub Pages finishes serving the new commit (usually within a few minutes).

### If deploy fails

- **SSH:** Ensure `git@github.com:iamsharmajitender/architects-handbook.git` works (`ssh -T git@github.com`).
- **Broken links:** `onBrokenLinks: 'throw'`: fix broken internal links before build/deploy succeeds.
- **Uncommitted changes:** Commit or stash changes on `main` before deploy; Docusaurus deploy expects a clean state for the source branch.

## GitHub Pages & DNS (jitendersharma.dev)

One-time / infra checklist:

1. **Repo → Settings → Pages**
   - Source: Deploy from branch **`gh-pages`** / root (or `/` if that is how the branch is structured after Docusaurus deploy).
2. **Custom domain:** `jitendersharma.dev` (should match `static/CNAME`).
3. **DNS** at your domain registrar (typical GitHub Pages setup):
   - **A records** for apex `@` → GitHub Pages IPs, **or**
   - **CNAME** `www` → `iamsharmajitender.github.io` (if using `www`)
   - See [GitHub: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
4. Enable **Enforce HTTPS** in GitHub Pages settings once DNS has propagated.

## Common commands

| Command | Description |
| --- | --- |
| `npm start` | Dev server with cache clear |
| `npm run build` | Production build → `build/` |
| `npm run serve` | Serve `build/` locally |
| `npm run clear` | Clear Docusaurus cache |
| `npm run deploy` | Build + push to `gh-pages` |
| `npm run typecheck` | TypeScript check |

## Redirects

- `/blogs/*` → `/insights/*` (client redirect plugin; legacy blog URLs)
