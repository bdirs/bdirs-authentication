FROM node:10-slim

COPY ./package.json app/package.json

WORKDIR /app

RUN yarn add global

RUN yarn install

COPY . .





