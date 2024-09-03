# Nuxt 3 (Domain-driven Design)

This project is powered by Nuxt3.

## Setup

> This project uses `npm` by default, but you can use other package manager like `pnpm` if preferred.

### 1. Install Dependecies

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Setup .gitattributes

This project uses `husky` and `lint-staged` to handle precommit config to fix eslint issue.
However, `pre-commit` bash file may cause error when committing due to incorrect file ending when different OS
is used for development (Windows and UNIX-based) which may cause these files to be treated incorrectly.

To prevent these issues, create `.gitattributes` file in root dir of this project with the settings below:

```bash
* text=auto eol=lf # This line allows files without extension (such as runnable files for husky) to have proper line ending and not tripping any error due to incorrect line-ending (depending on OS and/or IDE, git EOL setting might default to CRLF, which may cause some commands to throw error)
*.* -eol # This line revert back the EOL to whatever default is for any files with extension 

# Add any specific overrides for specific extensions below
#*.py eol=lf # This line override EOL for .py to LF
```

> This file is intentionally ignored in `.gitignore` because committing this file will throw warning from git.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
