# Étape 1 : Construction de l'application React
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Exposition via un serveur NGINX
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80 d’Nginx
EXPOSE 80

# NGINX démarrera par défaut
