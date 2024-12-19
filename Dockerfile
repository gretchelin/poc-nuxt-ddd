# Env setup
ARG NODE_VERSION=22.8.0

FROM node:${NODE_VERSION}-alpine AS ui

WORKDIR /src/ui

# Build
COPY --link ui/package.json ui/package-lock.json ./

RUN npm install --production=false

COPY ui/ ./

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /src

# By default, if PORT is not defined, Nuxt uses port 3000
ARG PORT=3000

ENV NODE_ENV=production

FROM base AS build
COPY --link package.json package-lock.json ./
RUN npm install --production=false

COPY --link . .

# Copy the installed ui layer from the ui stage
COPY --from=ui /src/ui /src/ui

RUN npm run build && npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]