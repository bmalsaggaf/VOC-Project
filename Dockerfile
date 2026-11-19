# Build stage: compile the TanStack Start app as a Node server
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock bunfig.toml ./
RUN bun install
COPY . .
# Build-time variable used by the report page (optional)
ARG VITE_REPORT_API_URL
ENV NITRO_PRESET=node-server
RUN bun run build

# Run stage: small Node image serving the built app
FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/.output ./.output
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
