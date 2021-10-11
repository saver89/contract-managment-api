FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./

run npm install

COPY . .

COPY ./dist ./dist

cmd ["npm", "run", "start:dev"]