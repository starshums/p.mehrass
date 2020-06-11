# Setup and build the client for production
FROM node as client

WORKDIR /usr/app/client/
COPY client/package*.json ./
RUN npm i
COPY client/ ./
RUN npm run build

# Setup the server
FROM node

WORKDIR /usr/app/
COPY --from=client /usr/app/client/build/ ./client/build/

WORKDIR /usr/app/server/
COPY server/package*.json ./
RUN npm i
COPY server/ ./

EXPOSE 80

CMD ["npm", "run", "prod"]