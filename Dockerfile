FROM node:16.13.2-alpine

WORKDIR app

COPY . .

RUN apk update && apk add curl
RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn", "start:prod"]
