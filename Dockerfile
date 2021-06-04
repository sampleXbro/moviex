FROM node:14-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV GENERATE_SOURCEMAP false
ENV NEXT_PUBLIC_API_KEY 2366ee9ce70473237b3ce1288bb02943

RUN yarn build


FROM node:14-alpine AS runner
WORKDIR /app

ENV NODE_ENV production



RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json



USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]