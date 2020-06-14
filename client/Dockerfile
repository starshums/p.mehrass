FROM node:12

RUN mkdir -p /usr/app/client/
WORKDIR /usr/app/client/

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]