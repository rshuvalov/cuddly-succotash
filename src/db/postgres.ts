import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(config.postgres.uri, {
  logging: false,
});

import '../users/models/postgres';

export const init = async () => {
  try {
    // await sequelize.sync({ force: true });
  } catch (err) {
    console.error(err);
  }
}
