# BUILD STAGE
FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g http-serve
COPY . .
RUN npm run build

# DEPLOY STAGE
EXPOSE 4200
CMD ["http-serve", "dist/webchat-angular"]
