FROM node:latest
LABEL description="Telegram bot to communicate with CNETS Storage service"
LABEL maintainer="Miguel Angel Diego miguelangel.diego@ts.fujitsu.com"
COPY ./app/ /app/
WORKDIR /app/

RUN npm install

ENV PORT 83

EXPOSE 83

CMD npm start