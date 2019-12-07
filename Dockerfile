# base image
# FROM node:12.13.1 as build-step
# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM nginx:1.17.6 as prod-stage
# COPY --from=build-step /app/dist/forum /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
FROM node:12.13.1
COPY . /app/
WORKDIR /app
RUN npm install && npm cache clean --force
EXPOSE 4200
CMD ["npm", "start"]
