import * as mongoose from 'mongoose';
import IUser from './User.interface';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true
  },
  email: { 
    type: String, 
    required: true,
    trim: true, 
    unique: true, 
    // eslint-disable-next-line max-len
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { 
    type: String, 
  required: true 
  },
  location: String
});

const User = mongoose.model<IUser & mongoose.Document>('User', schema);

export default User;
