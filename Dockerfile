FROM node:22-alpine3.21
WORKDIR /var/app
COPY ./dist ./dist
COPY ./db.json ./package.json ./package-lock.json ./
RUN npm i --omit=dev

EXPOSE $APP_PORT

# CMD ["sleep", "infinity"]
CMD ["node", "./dist/index.js"]