FROM node:8-alpine

LABEL maintainer="luispenagos91@gmail.com"

RUN mkdir -p /app && \
    echo 'Finalizo 1'

COPY ./package.json /app

WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN npm install && \
    npm install -g nodemon

CMD /wait; npm start
