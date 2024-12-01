FROM node:22-alpine

WORKDIR /app

COPY  package.json .

ENV REACT_APP_SERVER_URL="https://pugad-maharlika-backend.onrender.com"
ENV PORT=8080
ENV BROWSER=none

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
