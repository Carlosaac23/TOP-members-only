FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

FROM node:20-alpine

WORKDIR /app
RUN corepack enable

COPY --from=builder /app /app

EXPOSE 8000
CMD ["pnpm", "start"]