FROM node:latest

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]