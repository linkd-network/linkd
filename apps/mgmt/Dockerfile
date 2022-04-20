FROM node:14-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN npm install glob rimraf
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN pnpm install 


RUN npm run build
