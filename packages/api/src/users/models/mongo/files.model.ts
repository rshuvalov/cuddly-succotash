import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema({
  originalFilename: String,
  newFilename: String,
  path: String,
});

export const FileModel = mongoose.model('files', fileSchema);
