# syntax=docker/dockerfile:1.7

# ----- Stage 1: builder -----
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# OpenSSL is required by Prisma's query engine
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund

COPY src ./src

# ----- Stage 2: runtime -----
FROM node:20-bookworm-slim AS runtime
WORKDIR /app

# wget for HEALTHCHECK; openssl/ca-certificates for Prisma
RUN apt-get update \
    && apt-get install -y --no-install-recommends wget openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production \
    PORT=5001

# Copy artifacts from builder, owned by the unprivileged "node" user
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/prisma ./prisma
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/package*.json ./

USER node
EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

# Apply pending migrations on boot, then start the server.
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
