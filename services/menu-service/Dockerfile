# Dockerfile (menu-service)
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ✅ Ajoute cette ligne pour exposer les images
RUN mkdir -p /app/public/images

# ✅ Remplace le port si nécessaire
EXPOSE 5004

CMD ["node", "server.js"]
