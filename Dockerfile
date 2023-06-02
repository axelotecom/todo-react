FROM node:18.12-alpine as build
#host to your provider
ENV AXELOTE_HOST=localhost:8080
#env user
ENV AXELOTE_USERNAME=env@axelote.com
#env user pass
ENV AXELOTE_PASSWORD=pass
WORKDIR /react-app
COPY . .
RUN npm i
RUN npm i -g @axelote/cli
RUN axelote login
RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]