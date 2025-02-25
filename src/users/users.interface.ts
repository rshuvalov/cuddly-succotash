export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserRepository {
  find: () => Promise<User[]>;
  findById: (id: string) => Promise<User | void>;
  findByEmail: (email: string) => Promise<User | void>;
  create: (data: Omit<User, '_id'>) => Promise<User>;
  update: (data: User) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
