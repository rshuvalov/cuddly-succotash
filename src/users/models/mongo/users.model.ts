import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  name: String,
  password: String,
  files: [{ type: Schema.Types.ObjectId, ref: 'files' }],
});

export const UserModel = mongoose.model('user', userSchema);