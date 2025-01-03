FROM node:20.17.0-alpine

WORKDIR ./smokymoon
COPY ./ ./smokymoon

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]