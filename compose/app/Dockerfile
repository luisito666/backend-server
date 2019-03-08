FROM node:8-alpine

LABEL maintainer="luispenagos91@gmail.com"

RUN mkdir -p /app && \
    echo 'Finalizo 1'

COPY ./package.json /app

WORKDIR /app

RUN npm install && \
    npm install -g nodemon

