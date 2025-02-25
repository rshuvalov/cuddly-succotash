import * as _ from 'lodash';
import mongoose from 'mongoose';
import { UserRepository } from '../users.interface';
import { UserModel } from '../models/users.mongo-model';
import { User } from '../users.interface';

const userMongoRepository: UserRepository = {
  find() {
    return UserModel.find();
  },
  findById(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return UserModel.findById(objectId);
  },
  findByEmail(email: string) {
    return UserModel.findOne({ email });
  },
  async create(data: Omit<User, '_id'>) {
    const _id = new mongoose.Types.ObjectId();
    const user = new UserModel(Object.assign(data, { _id }));
    await user.save();
    return Object.assign(data, { _id: _id.toString() });
  },
  async update(data: User) {
    const _id = new mongoose.Types.ObjectId(data._id);
    await UserModel.updateOne({ _id }, _.omit(data, '_id'));
  },
  async delete(id: string) {
    const _id = new mongoose.Types.ObjectId(id);
    await UserModel.deleteOne({ _id });
  }
};

export default userMongoRepository;
