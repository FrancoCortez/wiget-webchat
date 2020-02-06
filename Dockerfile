# BUILD STAGE
FROM node:13.2.0-alpine AS builder
WORKDIR /app
ARG configuration=production
COPY package.json .
RUN npm install
RUN npm install -g http-serve
COPY . .
RUN npm run build:prod --configuration $configuration && npm run build:elements-prod

# DEPLOY STAGE
EXPOSE 4200
CMD ["http-serve", "dist/webchat-angular"]
