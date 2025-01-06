# Nuxt 3 (Domain-driven Design)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gretchelin_poc-nuxt-ddd&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=gretchelin_poc-nuxt-ddd)

This project is powered by Nuxt3.

<!-- TOC -->

* [Nuxt 3 (Domain-driven Design)](#nuxt-3-domain-driven-design)
    * [Setup](#setup)
        * [1. Install Dependencies](#1-install-dependencies)
        * [2. Setup Environment Variables](#2-setup-environment-variables)
        * [3. Running the project](#3-running-the-project)
            * [Development](#development)
            * [Production](#production)
    * [Dockerize Project](#dockerize-project)
    * [Sonarqube](#sonarqube)

<!-- TOC -->

## Setup

> This project uses `npm` by default, but you can use other package manager like `pnpm` if preferred.

### 1. Install Dependencies

Make sure to install the dependencies. This project uses `npm`, but it should work with other package manager.

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

### 2. Setup Environment Variables

Below are the env used for core functionality. There may be env that is module-specific mentioned here, but for complete
information regarding module-specific env variables, please refer to each module documentation.

These envs are also available in [`.env.example`](./.env.example) from which you can conveniently copy to create
local `.env` file.

| Env Key                        | Default Value | Notes                                         |
|--------------------------------|---------------|-----------------------------------------------|
| `NUXT_PUBLIC_ENABLE_MOCK`      |               | Enable mock for api using msw.js              |
| `NUXT_ENABLE_CONSOLE`          |               | Enable `console.log` on non-`development` env |
| `NUXT_APP_BASE_URL`            | `"/v2"`       | Base path for routes. ie. `/v2/landing-page`  |
| `NUXT_PUBLIC_AUTH_BASE_URL`    |               | Base API URL for auth stuff                   |
| `NUXT_PUBLIC_API_BASE_URL`     |               | Base API URL                                  |
| `NUXT_PUBLIC_STORAGE_BASE_URL` |               | Base API for file storage stuff               |
| `NUXT_SENTRY_DSN`              |               | Sentry DSN                                    |
| `NUXT_SENTRY_ORG`              |               | Sentry Organization                           |
| `NUXT_SENTRY_PROJECT`          |               | Sentry Project ID                             |
| `NUXT_SENTRY_TOKEN`            |               | Sentry Token                                  |

### 3. Running the project

#### Development

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

#### Production

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

## Dockerize Project

Make sure beforehand that proper `Dockerfile` has been setup.

 ```bash
 docker build -t nuxt-ddd-img .
 ```

Build docker image

```bash
docker run -it -p 3000:3000 --rm --name nuxt-ddd nuxt-ddd-img
```

Run project in docker container

## Sonarqube

To run sonar scanner locally (in docker), you can run this command from the command line.

> ⚠️ Make sure that current path is the root of this project and you have installed `SonarScanner CLI` in docker!

```bash
docker run -it  -e SONAR_HOST_URL="http://localhost:9000"  -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=nuxt-ddd -Dsonar.login=admin -Dsonar.password=password"  -v "$(pwd):/usr/src"  --net=host --name=sonarscanner-nuxt-ddd sonarsource/sonar-scanner-cli
```

> ℹ️
> - Replace `SONAR_HOST_URL` with your local sonar installation url.
> - Replace `sonar.login` and `sonar.password` with your local sonar installation login credential. Or you can
    use `-Dsonar.token=<generated_token>` instead of login cred

Official info related to sonarscanner can be
read [here](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/scanners/sonarscanner/#sonarscanner-from-docker-image).
