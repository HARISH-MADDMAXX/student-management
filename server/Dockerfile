FROM node:18-alpine3.16

# working directory

WORKDIR /usr/src/app

#copying package.json

COPY package*.json ./

#install files

RUN npm install

# copy src

COPY . .

#build

# RUN npm run build

# expose api port

EXPOSE 5000

CMD ["npm","start"]

