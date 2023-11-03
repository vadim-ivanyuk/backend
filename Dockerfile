FROM node:18-alpine
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD ["node", "./build/server.js"]