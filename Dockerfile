FROM node:15 AS build

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn

ADD . /app
RUN yarn build

FROM node:15 AS deploy
WORKDIR /app
COPY --from=build /app /app

EXPOSE 3000
CMD ["yarn", "start"]