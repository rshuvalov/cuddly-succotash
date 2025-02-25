import config from '../../config';
import localRepository from './users.local-repository';
import mongoRepository from './users.mongo-repository';
import postgresRepository from './users.postgres-repository';

const dbs = {
  local: localRepository,
  mongo: mongoRepository,
  postgres: postgresRepository,
};

export const repository = dbs[config.db] ?? localRepository;
