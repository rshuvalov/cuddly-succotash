# Traning project

Sentry

Installation
```
https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/typescript/#2-configure-sentry-cli
curl -sL https://sentry.io/get-cli/ | sh
sentry-cli sourcemaps inject build
sentry-cli sourcemaps upload build
```

Docker
```
docker build -t traning-koa:0.0.1 .
docker run --env-file .env --name traning-koa -p 3000:3000 traning-koa:0.0.1
```