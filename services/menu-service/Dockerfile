# Dockerfile (menu-service)
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

# ✅ Copie tout le code source, y compris les images
COPY . .

# ✅ Assure-toi que les images sont bien dans l'image finale
# Cette ligne est inutile si tu as déjà fait "COPY . ." qui inclut public/images
# Mais tu peux ajouter une ligne explicite si besoin :
# COPY public/images /app/public/images

# ✅ Port exposé par le menu-service
EXPOSE 5004

CMD ["node", "server.js"]
