import * as mongoose from 'mongoose';

interface IBook {
  _id: mongoose.Types.ObjectId,
  name: string,
  author?: string[],
  genres?: string[],
  year?: number,
  publisher?: string,
  description? : string,
  ownerId?: mongoose.Types.ObjectId
}

export default IBook;
