FROM node:22-alpine

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL="https://pugad-maharlika-backend.onrender.com"

RUN npm run build

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "build", "-l", "8080"]
