FROM node:18-alpine as build

WORKDIR /home/node

COPY . /home/node

RUN \
    npm ci && \
    npm run build

FROM nginx
EXPOSE 80
COPY --from=build /home/node/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]