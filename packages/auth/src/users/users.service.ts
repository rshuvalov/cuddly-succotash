import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { repository as userRepository } from './repository';

export const createUser = async data => {
  if (await userRepository.findByEmail(data.email)) {
    throw new Error(`User with email ${data.email} already created`);
  }
  const user = Object.assign(data, {
    password: await bcrypt.hash(data.password, 10),
  });
  await userRepository.create(user);
  return user;
}

export const getUserByEmail = email => userRepository.findByEmail(email);
