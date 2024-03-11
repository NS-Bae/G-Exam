FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install --no-cache

COPY . /app

CMD ["npm", "run", "start"]