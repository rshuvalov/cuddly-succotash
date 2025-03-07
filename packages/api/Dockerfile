FROM node:22-alpine3.21 AS build
WORKDIR /var/app
COPY . .
RUN npm i
RUN npm run build

FROM node:22-alpine3.21
WORKDIR /var/app
COPY --from=build /var/app/dist ./dist
COPY --from=build /var/app/package.json /var/app/package-lock.json ./
RUN npm i --omit=dev

EXPOSE $APP_PORT

# CMD ["sleep", "infinity"]
CMD ["node", "./dist/index.js"]