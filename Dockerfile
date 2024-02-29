FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build 

FROM nginx:1.19-alpine
EXPOSE 80
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]