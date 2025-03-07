import * as _ from 'lodash';
import mongoose from 'mongoose';
import { UserRepository } from '../users.interface';
import { UserModel, FileModel } from '../models/mongo';
import { User } from '../users.interface';

const userMongoRepository: UserRepository = {
  find() {
    return UserModel.find({}) as never;
  },
  findById(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return UserModel.findById(objectId) as never;
  },
  findByEmail(email: string) {
    return UserModel.findOne({ email }) as never;
  },
  async create(data: User) {
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
  },
  async createFile(userId, fileData) {
    const _id = new mongoose.Types.ObjectId();
    const file = await FileModel.create(Object.assign(fileData, { _id }));
    await file.save();
    await UserModel.updateOne(
      { _id: userId }, 
      { $push: { files: file._id } },
    );
  },
  async findFileById(id) {
    const _id = new mongoose.Types.ObjectId(id);
    return FileModel.findById(_id) as never;
  },
  async addFile(fileId, userId) {
    const _id = new mongoose.Types.ObjectId(fileId);
    const _userId = new mongoose.Types.ObjectId(userId);
    await UserModel.updateOne(
      { _id: _userId, files: { $nin: [_id] } }, 
      { $push: { files: _id } },
    );
  },
  async findFilesByUserId(userId: string) {
    const _id = new mongoose.Types.ObjectId(userId);
    return await UserModel.aggregate([
      {
        $match: { _id },
      },
      {
        $lookup: {
          as: 'files',
          foreignField: '_id',
          from: 'files',
          localField: 'files',
        }
      },
      {
        $unwind: '$files',
      },
      { 
        $project: {
          'files._id': '$files._id',
          'files.originalFilename': '$files.originalFilename',
          'files.newFilename': '$files.newFilename',
          'files.path': '$files.path',
        },
      },
    ]) as any;
    // return await UserModel.findOne({ _id }).populate('files') as any;
  },
};

export default userMongoRepository;
