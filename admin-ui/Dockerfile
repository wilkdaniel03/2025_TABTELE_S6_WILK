FROM nginx:1.29.4-alpine
RUN rm -rf /etc/nginx/nginx
COPY ./nginx.conf /etc/nginx/
RUN mkdir -p /var/www/html
COPY ./registry.html /var/www/html/
COPY ./styles.css /var/www/html/
COPY ./script.js /var/www/html/
