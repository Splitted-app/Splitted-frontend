FROM node:20.8-alpine as build-env

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./
RUN npm run build

FROM nginx:1.25.3

COPY --from=build-env /app/build/ /usr/share/nginx/html
COPY --from=build-env /app/nginx.conf /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]