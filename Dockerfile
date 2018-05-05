FROM node:10.4.0-stretch

ADD . /app

WORKDIR /app

RUN npm i

EXPOSE 3014

CMD npm run start-lite
