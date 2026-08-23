# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.15.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV="production"


# Throw-away build stage to keep the final image small
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci

COPY . .

# The map geometry is committed (public/geometry.json), so the image does not
# need to download the ~65 MB of Natural Earth sources to build it. Run
# `npm run build` locally and commit the result when the shapes change.


# Final stage
FROM base

COPY --from=build /app /app

EXPOSE 3000
CMD [ "npm", "run", "start" ]
