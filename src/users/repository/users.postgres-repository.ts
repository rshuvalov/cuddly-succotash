import * as _ from 'lodash';
import { sequelize } from '../../db/postgres';
import { UserModel, FileModel } from '../models/postgres';
import { User, UserRepository, File } from '../users.interface';

const userPostgresRepository: UserRepository = {
  async find() {
    return UserModel.findAll({ raw: true }) as unknown as User[];
  },
  async findById(userId: string) {
    return UserModel.findByPk(userId, { raw: true }) as any;
  },
  findByEmail(email: string) {
    return UserModel.findOne({ where: { email }, raw: true }) as any;
  },
  async create(data: Omit<User, 'id'>) {
    const _id = crypto.randomUUID();
    const user = Object.assign(data, { _id });
    await UserModel.create(user);
    return data;
  },
  async update(data: User) {
    await UserModel.update(_.omit(data, '_id'), {
      where: { _id: data._id }
    });
  },
  async delete(userId) {
    await UserModel.destroy({
      where: {
        _id: userId,
      }
    });
  },
  async createFile(userId: string, fileData: Omit<File, '_id'>) {
    const _id = crypto.randomUUID();
    const file = await FileModel.create(Object.assign(fileData, { _id }));
    const user = await UserModel.findByPk(userId);
    await user.addFile(file);
  },
  async findFileById(id) {
    return FileModel.findByPk(id, { raw: true }) as any;
  },
  async addFile(fileId: string, userId: string) {
    try {
      const user = await UserModel.findByPk(userId);
      const file = await FileModel.findByPk(fileId);
      await user.addFile(file);
    } catch (err) {
      // handle dublication
    } 
  },
  async findFilesByUserId(userId: string) {
    const files = await FileModel.findAll({
      include: [
        {
          model: UserModel,
          attributes: [],
          through: {
            attributes: [],
          },
        }
      ],
      raw: true,
    });

    return files as any;
  }
}

export default userPostgresRepository;