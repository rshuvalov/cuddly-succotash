import fs from 'node:fs';
import config from '../config';
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

export const uploadUserFile = async (id, uploadedData) => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('User with provided id does not exist');
  }

  const { newFilename, originalFilename, filepath } = uploadedData;
  const fileData = {
    newFilename,
    originalFilename,
    path: config.fileDir,
  }
  try {
    fs.copyFileSync(filepath, config.fileDir);
  } catch (err) {
    console.log('Cannot move file', err);
  }
  await userRepository.createFile(id, fileData);
}

export const shareFile = async (fileId: string, userId: string) => {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw new Error('User with provided id does not exist');
  }
  const file = await userRepository.findFileById(fileId);
  if (!file) {
    throw new Error('File with provided id does not exist');
  }
  await userRepository.addFile(fileId, userId);
}

export const getProfileById = async id => {
  const user = await userRepository.findById(id);
  const files = await userRepository.findFilesByUserId(id);
  if (files) {
    Object.assign(user, { files });
  }
  return user;
}
