export interface User {
  _id?: string;
  name: string;
  email: string;
}

export interface File {
  _id: string;
  originalFilename: string;
  newFilename: string;
  path: string;
}

export interface UserRepository {
  find: () => Promise<User[]>;
  findById: (userId: string) => Promise<User | void>;
  findByEmail: (email: string) => Promise<User | void>;
  create: (data: User) => Promise<User>;
  update: (data: User) => Promise<void>;
  delete: (userId: string) => Promise<void>;
  createFile: (userId, fileData: Omit<File, '_id'>) => Promise<void>;
  findFileById: (fileId: string) => Promise<File | void>;
  addFile: (fileId: string, userId: string) => Promise<void>;
  findFilesByUserId: (userId) => Promise<File | void>;
}
