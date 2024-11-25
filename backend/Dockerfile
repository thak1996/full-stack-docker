FROM node:18

EXPOSE 3001

WORKDIR /backend

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

RUN chmod -R 755 /backend

RUN npx tsc

CMD ["node", "dist/index.js"]