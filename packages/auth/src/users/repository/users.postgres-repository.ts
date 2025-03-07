import * as _ from 'lodash';
import { UserModel } from '../models/postgres';
import { User, UserRepository } from '../users.interface';

const userPostgresRepository: UserRepository = {
  findByEmail(email: string) {
    return UserModel.findOne({ where: { email }, raw: true }) as any;
  },
  async create(data: Omit<User, 'id'>) {
    const _id = crypto.randomUUID();
    const user = Object.assign(data, { _id });
    await UserModel.create(user);
    return data;
  },
}

export default userPostgresRepository;