# Starlight Starter Kit: Basics

## Prerequisites for editing and viewing the documentation site locally

If this is your first encounter with a git-based workflow, we recommend that you study up on what git is and how git (and GitHub) works. One such tutorial is available [here](https://docs.github.com/en/get-started).

### How to set up your local copy of the documentation site for editing and viewing

1. Install `npm`. On AerynOS this is done with `sudo moss install 'binary(npm)'`
2. Clone this project in such a way that you have write access to it and can push commits to it. One way to do this is to [use the `gh` github-cli](https://cli.github.com/manual/gh_repo_clone) binary, which you can install on AerynOS with `sudo moss install 'binary(gh)'`.
3. Navigate to the root of the newly cloned folder.
4. Run `npm install` to install the necessary NodeJS packages for building the local copy of the website into web pages you can view in your browser to check your work.
5. Run `npm run dev` to build the current website source into html pages. Once this is running, your content edits will be automatically turned into html as you save them.
   - note that after running the above, `npm` will notify you that it has started a local webserver on `http://localhost:4321`. Click that link to open the local copy of the doc site in your browser.
6. When you are happy with your edits, commit your changes in your local git repository and create a Pull Request from said local changes.

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
