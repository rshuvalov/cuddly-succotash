import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: Number(process.env.APP_PORT ?? 3000),
  jwtSecret: process.env.JWT_SECRET,
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  db: process.env.DB ?? 'local',
}
