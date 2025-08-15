# Stage 1 — Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2 — Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3 — Runtime
FROM node:20-alpine AS runner
WORKDIR /app

# Copy production dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy build output
COPY --from=builder /app/dist ./dist

# Expose NestJS default port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]