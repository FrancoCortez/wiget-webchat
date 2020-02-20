# BUILD STAGE
FROM node:13.2.0-alpine AS builder
WORKDIR /app
ARG configuration=production
ENV NODE_ENV=production
COPY package.json .
RUN npm install -g yarn
RUN yarn install
COPY . .
ARG ENV=qa
RUN npm run build:elements-$ENV

# DEPLOY STAGE
FROM nginx:stable

COPY --from=builder /app/dist/webchat-angular/* /var/www/

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf.template

# Default configuration
ENV PORT 8080
ENV SERVER_NAME _
ENV uri \$uri

ENV BFF_PORTAL_WEBCHAT='https://channels.chattigo.com'
ENV SOCKET_SERVER='https://channels.chattigo.com'
ENV SOCKET_PATH='/webchat/socket.io'
ENV CDN_HOST='cdn.chattigo.com'
ENV SPRING_PROFILES_ACTIVE='production'
ENV CONFIG_SERVER='https://k8s.chattigo.com/config'

CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

