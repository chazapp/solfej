FROM nginx
COPY index.html solfej.js style.css favicon.ico /usr/share/nginx/html
EXPOSE 80