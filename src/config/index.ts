import fs, { mkdir } from 'node:fs';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  port: Number(process.env.APP_PORT ?? 3000),
  jwtSecret: process.env.JWT_SECRET,
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  db: process.env.DB ?? 'local',
  mongo: {
    uri: process.env.MONGO_URI,
  },
  postgres: {
    uri: process.env.POSTGRES_URI,
  },
  fileDir: process.env.FILES_DIR,
}

if (!fs.existsSync(config.fileDir)) {
  fs.mkdirSync(config.fileDir);
}

export default config;
