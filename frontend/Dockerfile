FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# 👇 Installe axios directement ici
RUN npm install 
##&& npm install axios

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
