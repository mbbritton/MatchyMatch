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

### 1. Enable Actions on your fork

GitHub disables workflows on forks by default. Open the **Actions** tab on your fork and click **"I understand my workflows, go ahead and enable them."**

### 2. Point Pages at Actions

Go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions** (not "Deploy from a branch").

This also creates the `github-pages` environment that the `deploy` job targets. Skip this step and the deploy job fails on the missing environment.

### 3. Fix the base path if you renamed the fork

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

### 4. Push to `main`

The pipeline runs `lint`, `test`, and `build`, and the `deploy` job only runs on `main`. Once all three pass, your site publishes to:

```
https://<your-username>.github.io/<your-repo>/
```

`workflow_dispatch` is also enabled, so you can trigger a deploy by hand from the Actions tab.

### Note on puzzle selection

`scripts/pick-puzzle.js` runs before every build and overwrites `.env.production` with a randomly chosen puzzle index. That means each deploy serves a different puzzle. If you want reproducible builds, drop that step from the `build` job and commit a fixed `VITE_PUZZLE_INDEX`.

## 😄 A Little Joke

Why did the matching game break up with the memory game?

Because it kept finding someone **else** a perfect match! 🃏
