import { Sequelize } from 'sequelize';
import config from '../config';

export const sequelize = new Sequelize(config.postgres.uri);

export const init = async () => {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error(err);
  }
}
