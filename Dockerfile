# Build frontend
FROM node:latest as build-frontend
ENV VITE_API_URL=""
WORKDIR /build
COPY front/package*.json ./
COPY front/yarn.lock ./
RUN yarn install --silent
RUN yarn add -D @types/node
COPY front/. .
RUN yarn build

# Build backend
FROM node:15 AS build-backend
WORKDIR /build
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --silent
COPY . .
RUN yarn build:back

# Deploy
FROM node:15 AS deploy
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY --from=build-frontend /build/dist /app/front/dist
COPY --from=build-backend /build/dist /app/dist
COPY --from=build-backend /build/package.json .
COPY --from=build-backend /build/yarn.lock .
RUN yarn install --silent

CMD ["node", "dist/app.js"]