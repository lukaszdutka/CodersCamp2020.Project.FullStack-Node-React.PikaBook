import * as mongoose from "mongoose";
import IPoke from "./Poke.interface";

const schema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  ],
  read: {
    type: Boolean, 
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Poke = mongoose.model<IPoke & mongoose.Document>("Poke", schema);

export default Poke;
