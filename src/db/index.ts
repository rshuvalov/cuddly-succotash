import config from '../config';
import * as dbLocal from './local';
import * as dbMongo from './mongo';
import * as dbPostgres from './postgres';

const dbs = {
  local: dbLocal,
  mongo: dbMongo,
  postgres: dbPostgres,
};

export const db = dbs[config.db] ?? dbLocal;