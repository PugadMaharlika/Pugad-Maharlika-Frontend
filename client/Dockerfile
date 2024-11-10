FROM node:22-alpine

WORKDIR /app

COPY  package.json .

ENV REACT_APP_SERVER_URL="http://localhost:5050"
ENV PORT=8080
ENV BROWSER=none

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
