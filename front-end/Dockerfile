FROM node:14


WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.17

WORKDIR /usr/share/nginx/html

# VueJS
COPY --from=0 /app/dist .
