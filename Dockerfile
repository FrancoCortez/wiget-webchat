# BUILD STAGE
FROM node:13.2.0-alpine AS builder
WORKDIR /app
ARG configuration=production
COPY package.json .
RUN npm install -g http-serve yarn
RUN yarn install
COPY . .
RUN yarn build:prod --configuration $configuration && yarn build:elements-prod

# DEPLOY STAGE
EXPOSE 4200
CMD ["http-serve", "dist/webchat-angular"]
