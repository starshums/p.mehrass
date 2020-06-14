FROM node:12

RUN mkdir -p /usr/app/server/
WORKDIR /usr/app/server/

RUN npm i -g nodemon

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5000

CMD ["nodemon"]