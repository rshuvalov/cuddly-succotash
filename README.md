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
Run docker-compose.yml file
```
cd infra-local
docker compose up -d
```
Stop containers from docker-compose.yml
```
cd infra-local
docker compose down
```
Check container statuses:
```
docker ps
```

Docker build image
```
docker build -t traning-koa:0.0.1 .
```
Docker run image
```
docker run --env-file .env --name traning-koa -p 3000:3000 traning-koa:0.0.1
```

#### Troubleshooting
```
issue:
network devnetwork declared as external, but could not be found
solution:
docker network create devnetwork

issue:
Error response from daemon: Conflict. The container name "/postgres" is already in use by container "accf2e7a8ebba3e824a53b8b870ae546524dd10856caf75b221e5bf93e994ba5". You have to remove (or rename) that container to be able to reuse that name.
solution:
docker rm accf2e7a8ebba3e824a53b8b870ae546524dd10856caf75b221e5bf93e994ba5
```