# Nuxt 3 (Domain-driven Design)

This project is powered by Nuxt3.

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

### 2. Running the project


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

> `docker build -t maximus-cms-img .`

Build docker image

> `docker run -it -p 3000:3000 --rm --name maximus-cms maximus-cms-img`

Run project in docker container


## Sonarqube

To run sonar scanner locally (in docker), you can run this command from the command line. Make sure that current path is
the root of this project!

```docker
docker run -it  -e SONAR_HOST_URL="http://localhost:9000"  -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=mdl-cms -Dsonar.login=admin -Dsonar.password=password"  -v "$(pwd):/usr/src"  --net=host --name=sonarscanner-maximus-cms sonarsource/sonar-scanner-cli
```

Replace `SONAR_HOST_URL` with your local sonar installation url, `sonar.login` and `sonar.password` with your local
sonar installation login credential.

The command above is meant to be run on UNIX systems. If using Windows (Powershell), replace the `$(pwd)` with `%cd%`
to get current directory. Or replace that with absolute path if you're running the command not from the root of
this project.