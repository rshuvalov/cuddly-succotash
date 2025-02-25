import * as crypto from 'node:crypto';
import * as _ from 'lodash';
import { User, UserRepository } from '../users.interface';
import { UserModel } from '../models/users.postgres-model';

const userPostgresRepository: UserRepository = {
  find() {
    return UserModel.findAll({ raw: true }) as any;
  },
  findById(id: string) {
    return UserModel.findByPk(id, { raw: true }) as any;
  },
  findByEmail(email: string) {
    return UserModel.findOne({ where: { email }, raw: true }) as any;
  },
  async create(data) {
    const _id = crypto.randomUUID();
    const user = Object.assign(data, { _id });
    await UserModel.create(user);
    return user;
  },
  async update(data) {
    await UserModel.update(_.omit(data, '_id'), {
      where: { _id: data._id }
    });
  },
  async delete(id) {
    await UserModel.destroy({
      where: {
        _id: id,
      }
    });
  }
}

export default userPostgresRepository;