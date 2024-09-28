FROM node

WORKDIR /app

VOLUME [ "/app/node_modules", "/app/.next/" ]

COPY package.json .

RUN npm install

RUN npm run build

EXPOSE 3000

COPY . .

CMD ["npm", "start"]