FROM node:14-alpine As development

WORKDIR /mgmt

COPY . .

# RUN npm install glob rimraf
# RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

RUN npm install 

RUN npm run build

CMD [ "npm","run","start:dev:dean" ]