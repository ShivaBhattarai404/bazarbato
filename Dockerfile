FROM node

WORKDIR /app

COPY package.json .

RUN npm install

VOLUME [ "/app/node_modules" ]

VOLUME [ "/app/.next/" ]

EXPOSE 3000

RUN npm run build

COPY . .

CMD ["npm", "start"]