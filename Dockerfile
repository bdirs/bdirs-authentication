FROM node:13-alpine as base

LABEL maintainer="aggrey256@gmai.com"

WORKDIR /usr/src/app

RUN apk add python3

RUN apk update && apk add bash

RUN npm install -g tsc

COPY package.json .

RUN npm install --quiet

COPY . .


