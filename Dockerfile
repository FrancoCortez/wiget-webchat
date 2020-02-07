# BUILD STAGE
FROM node:13.2.0-alpine AS builder
WORKDIR /app
ARG configuration=production
COPY package.json .
RUN npm install -g http-serve yarn
RUN yarn install
COPY . .
ARG ENV=qa
RUN npm run build:elements-$ENV

# DEPLOY STAGE
EXPOSE 4200
CMD ["http-serve", "dist/webchat-angular"]
