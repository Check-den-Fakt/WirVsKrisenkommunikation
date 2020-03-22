FROM nginx:latest

RUN mkdir /etc/nginx/conf.templates
COPY default.conf.template /etc/nginx/conf.templates
COPY build /usr/share/nginx/html

CMD envsubst '$${BACKEND}' < /etc/nginx/conf.templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'

