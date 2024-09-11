# Env setup
ARG NODE_VERSION=22.8.0

FROM node:${NODE_VERSION}-alpine as base

# By default, if PORT is not defined, Nuxt uses port 3000
ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json .
RUN npm install --production=false

COPY --link . .

RUN npm run build
RUN npm prune

# Run
FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]