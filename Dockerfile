FROM node:22-bookworm-slim

WORKDIR /app

ENV DATABASE_URL=file:/app/data/tondaw.db

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["sh", "-c", "npm run db:deploy && npm run db:seed && npm start"]
