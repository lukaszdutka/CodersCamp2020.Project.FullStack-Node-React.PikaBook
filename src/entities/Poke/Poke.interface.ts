import * as mongoose from 'mongoose';

interface IPoke {
  _id: mongoose.Types.ObjectId,
  sender?: mongoose.Types.ObjectId,
  recipient: mongoose.Types.ObjectId,
  books: [mongoose.Types.ObjectId],
  date: Date
}

export default IPoke;
