import config from '../../config';
import localRepository from './users.local-repository';

const dbs = {
  local: localRepository,
};

export const repository = dbs[config.db] ?? localRepository;
