FROM node:14
WORKDIR	~/apps/bioinformatics
COPY package*.json ./

RUN npm	install
RUN npm audit fix

COPY . .

RUN npm run sass:build

EXPOSE 3000
CMD ["node", "src/index.js"]
