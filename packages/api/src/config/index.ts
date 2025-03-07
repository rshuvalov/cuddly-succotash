import * as fs from 'node:fs';
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
  kafka: {
    uri: process.env.KAFKA_URI,
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
  }
}

if (!fs.existsSync(config.fileDir)) {
  try {
    fs.mkdirSync(config.fileDir);
  } catch (err) {
    //
  }
}

export default config;
