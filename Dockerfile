FROM node:20.17.0-alpine

WORKDIR ./
COPY ./ ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]