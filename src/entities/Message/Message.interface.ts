import * as mongoose from "mongoose";

interface IMessage {
  _id: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  sender?: mongoose.Types.ObjectId;
  content: string;
  date?: Date;
  read?: boolean;
}

export default IMessage;
