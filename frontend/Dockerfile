FROM node:20-alpine

WORKDIR /frontend

COPY . .

RUN npm install

EXPOSE 5173

CMD [ "npm", "run", "dev" ]

