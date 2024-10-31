FROM node:22-alpine

WORKDIR /app

COPY  package.json .

ENV REACT_APP_SERVER_URL="http://localhost:5050"

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
