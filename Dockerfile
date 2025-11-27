FROM nginx
COPY index.html solfej.js style.css favicon.ico NotoMusicRegular.tff /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80