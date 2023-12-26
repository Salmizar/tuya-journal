FROM node:16

WORKDIR /

COPY /client/build /client/build

COPY /server/package.json /server/package.json
COPY /server/package-lock.json /server/package-lock.json

WORKDIR /server

RUN npm install

RUN npm install codetheweb/tuyapi

COPY . .

EXPOSE 3000

CMD [ "node", "server/index.js" ]