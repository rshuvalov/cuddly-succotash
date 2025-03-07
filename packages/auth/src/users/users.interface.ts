export interface User {
  _id: string;
  email: string;
  password: string;
}

export interface UserRepository {
  findByEmail: (email: string) => Promise<User | void>;
  create: (data: Omit<User, '_id'>) => Promise<User>;
}
