FROM nginx

COPY ./g-exam-front /usr/share/nginx/html
COPY ./g-exam-back /usr/share/nginx/backend

COPY ./nginx.conf /etc/nginx/default.conf

CMD ["nginx", "-g", "daemon off;"]