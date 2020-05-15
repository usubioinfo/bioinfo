FROM node:12
WORKDIR	~/apps/bioinfocore
COPY package*.json ./

RUN npm	install

COPY . .

EXPOSE 3010
CMD ["node", "src/index.js"]
