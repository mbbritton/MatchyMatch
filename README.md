# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying your fork to GitHub Pages

The CI/CD pipeline lives in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) and is committed to the repo, so your fork gets it automatically — there is nothing to copy. What a fork does *not* inherit are the repo-level settings the workflow depends on, so you need to turn those on yourself.

Work through the **Settings** tab first, then the **Actions** tab, then push.

### 1. Point Pages at Actions

**Settings → Pages → Build and deployment** — set **Source** to **GitHub Actions** (not "Deploy from a branch").

This also creates the `github-pages` environment that the `deploy` job targets. Skip this step and the deploy job fails on the missing environment.

### 2. Check Actions permissions (only if your fork is in an org)

**Settings → Actions → General → Actions permissions** — make sure this is set to **Allow all actions and reusable workflows**.

Personal forks are already set this way, so you can usually skip straight to step 3. But if your fork lives in an organization that restricts Actions, or the setting is on **Disable all**, the button in the next step won't be enough on its own — an admin has to loosen this first.

### 3. Enable the workflows on your fork

**Actions** tab → click **"I understand my workflows, go ahead and enable them."**

GitHub disables workflows on any fork of a repo that already contained workflow files, and this banner is the only place to re-enable them. It won't run anything yet — that takes a push or a manual trigger.

### 4. Fix the base path if you renamed the fork

`vite.config.js` hardcodes the site's base path:

```js
base: '/MatchyMatch/',
```

If your fork keeps the name `MatchyMatch`, this works as-is. If you renamed it, every asset URL will point at the wrong path and the deployed page loads blank — so update the string to match your repo name, or let it derive itself:

```js
base: process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/MatchyMatch/',
```

`GITHUB_REPOSITORY` is set automatically inside Actions. If you forked into a user site (`your-username.github.io`), the base needs to be `'/'` instead.

### 5. Push to `main`

The pipeline runs `lint`, `test`, and `build`, and the `deploy` job only runs on `main`. Once all three pass, your site publishes to:

```
https://<your-username>.github.io/<your-repo>/
```

`workflow_dispatch` is also enabled, so you can trigger a deploy by hand from the Actions tab instead.

### Note on puzzle selection

`scripts/pick-puzzle.js` runs before every build and overwrites `.env.production` with a randomly chosen puzzle index. That means each deploy serves a different puzzle. If you want reproducible builds, drop that step from the `build` job and commit a fixed `VITE_PUZZLE_INDEX`.

## 😄 A Little Joke

Why did the matching game break up with the memory game?

Because it kept finding someone **else** a perfect match! 🃏
