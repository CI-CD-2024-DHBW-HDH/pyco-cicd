FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

ARG buildarg 

RUN npm run build 

FROM nginx:alpine as run
EXPOSE 8080
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]