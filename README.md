# Traning project

### Requirements:
- Node.js 22.14.0
- npm 10.9.2

### How to run
#### Install dependencies:
```
npm i
```
#### Create .env file from template:
```
cp .env-example .env
```
P.S. for now only APP_PORT, JWT_SECRET interested
#### Run dev server:
```
npm run dev
```

### Sentry
```
https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/typescript/#2-configure-sentry-cli
curl -sL https://sentry.io/get-cli/ | sh
sentry-cli sourcemaps inject build
sentry-cli sourcemaps upload build
```

### Infrastructure
Docker
```
docker build -t traning-koa:0.0.1 .
docker run --env-file .env --name traning-koa -p 3000:3000 traning-koa:0.0.1
```