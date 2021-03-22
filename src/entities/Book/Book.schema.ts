import * as mongoose from 'mongoose';
import IBook from './Book.interface';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: [String]
  },
  genres: {
    type: [String]
  },
  year: {
    type: Number
  },
  publisher: {
    type: String
  },
  description: {
    type: String
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Book = mongoose.model<IBook & mongoose.Document>('Book', schema);

export default Book;
