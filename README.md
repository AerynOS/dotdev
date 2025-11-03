# Starlight Starter Kit: Basics

## Prerequisites for editing and viewing the documentation site locally

If this is your first encounter with a git-based workflow, we recommend that you study up on what git is and how git (and GitHub) works. One such tutorial is available [here](https://docs.github.com/en/get-started).

### How to set up your local copy of the documentation site for editing and viewing

Before attempting to compile and show the website locally, please ensure that:

- NodeJS is installed on your system
- `pnpm` is available and in your path
  - with NodeJS installed, you can run the following from your ${HOME} directory:
    ```
    npm install pnpm@latest-10
    ```
  - Make sure you add `${HOME}/node_modules/.bin` to your shell ${PATH}
- With the above prerequisites satisfied, clone the present repo and cd into the root of it.
- Then run:
  ``` 
  pnpm install
  ```

## How to build and show the site locally in your browser

After the above import and install operations have completed successfully on your system, run:

    pnpm run dev

... and follow the instructions shown.

At this point, any time you edit a page, the changes should show up live in your browser..

When you are happy with your edits, commit your changes in your local git repository and create a Pull Request from said local changes.

### Suggested writing style guide

We recommend that you consult the [Solus documentation style guide](https://help.getsol.us/docs/user/contributing/style/) when it comes to how to address your target audience.

### Example github commit message

When describing your changes, [use imperative mood, present tense and an active voice](https://github.com/joelparkerhenderson/git-commit-message/).

Example:

```
packaging: Add goober subsection on frobnicating

- Add up front context that the user needs to know
- Ensure that the structure flows naturally from start to finish
- Simplify the fiddlybob section language to shorter, international english sentences
- Run spellcheck on the changes to ensure they are written in US English.
```

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   └── content.config.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## Multilingual setup

English remains the default language under `src/content/docs/`. Placeholder folders exist for these additional locales:

- `src/content/docs/es` (Spanish)
- `src/content/docs/fr` (French)
- `src/content/docs/de` (German)
- `src/content/docs/pt` (Portuguese)
- `src/content/docs/zh` (Chinese)
- `src/content/docs/ja` (Japanese)
- `src/content/docs/ko` (Korean)
- `src/content/docs/ru` (Russian)
- `src/content/docs/ar` (Arabic, right-to-left)
- `src/content/docs/hi` (Hindi)

When you're ready to enable multilingual routing, uncomment the reference block in `astro.config.mjs` (labelled “Multilingual reference implementation”). Then mirror the English file’s relative path inside the target language folder. Starlight will automatically fall back to the English content whenever a translated file is missing.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
