import * as mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId,
  name: string,
  email: string,
  password: string,
  location?: string
}

export default IUser;
