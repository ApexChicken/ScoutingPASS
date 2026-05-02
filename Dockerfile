# ─── builder ─────────────────────────────────────────────────────────────────
# Compiles native modules (better-sqlite3, argon2). The toolchain lives only
# in this stage so the runtime image stays small.
FROM node:22-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app/server

COPY server/package.json server/package-lock.json* ./
RUN npm install --omit=dev


# ─── runtime ─────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runtime

RUN apk add --no-cache wget && \
    addgroup -S app && adduser -S app -G app

WORKDIR /app

COPY --from=builder /app/server/node_modules ./server/node_modules
COPY server ./server
COPY public ./public

# Static site files (existing, untouched).
COPY index.html pit.html favicon.ico ./
COPY resources ./resources
COPY 2025 ./2025
COPY 2026 ./2026
COPY archive ./archive

RUN chown -R app:app /app
USER app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/healthz >/dev/null 2>&1 || exit 1

CMD ["node", "server/src/index.js"]
