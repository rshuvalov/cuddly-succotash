import * as crypto from 'node:crypto';
import { db } from '../../db';
import { User, UserRepository } from '../users.interface';

const userLocalRepository: UserRepository = {
  find() {
    return db.storage.get();
  },
  findById(id: string) {
    return db.storage.get(id);
  },
  findByEmail(email: string) {
    return db.storage.getBy('email', email);
  },
  async create(data: Omit<User, 'id'>) {
    const user = Object.assign(data, { id: crypto.randomUUID() });
    await db.storage.add(user.id, user);
    return user;
  },
  update(data: any) {
    return db.storage.update(data.id, data);
  },
  delete(id: string) {
    return db.storage.delete(id)
  }
}

export default userLocalRepository;
