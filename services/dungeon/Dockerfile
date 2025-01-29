# Utilise une image Node légère
FROM node:18-alpine

# Création et utilisation du répertoire de l'application
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Exposition du port (doit correspondre à celui utilisé par le service)
EXPOSE 5001

# Commande de démarrage
CMD ["node", "server.js"]
