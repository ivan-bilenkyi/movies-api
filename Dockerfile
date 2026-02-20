FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG APP_PORT=8050
ENV PORT=$APP_PORT

EXPOSE $PORT

CMD ["node", "server.js"]
