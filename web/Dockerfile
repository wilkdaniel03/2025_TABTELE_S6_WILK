FROM node:25-alpine3.22 AS node
WORKDIR /app
ADD ./ ./
RUN npm install
RUN npm run build

FROM nginx:1.29-alpine
RUN rm /etc/nginx/nginx.conf
RUN mkdir -p /var/www/app
COPY --from=node /app/dist/* /var/www/app/
COPY ./nginx.conf /etc/nginx/
