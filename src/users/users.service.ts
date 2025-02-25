import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import { repository as userRepository } from './repository';

export const getUsers = () => userRepository.find();

export const getUserById = (id: string) => userRepository.findById(id);

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

export const updateUser = async (id: string, data) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  const updatedUser = Object.assign(user, _.omit(data, ['id', 'password']));
  await userRepository.update(updatedUser);
  return updatedUser;
}

export const deleteUserById = id => userRepository.delete(id);

export const getUserByEmail = email => userRepository.findByEmail(email);
