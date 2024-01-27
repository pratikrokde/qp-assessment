FROM node:14-alpine

RUN apk add g++ make curl py-pip

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

USER node
RUN npm install

# Bundle app source
COPY --chown=node:node . .

EXPOSE 7000
CMD [ "npm", "run", "dev" ]
