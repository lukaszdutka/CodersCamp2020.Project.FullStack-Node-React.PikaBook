import * as mongoose from "mongoose";

interface IConversation {
  _id: mongoose.Types.ObjectId;
  interlocutors: [mongoose.Types.ObjectId];
  messages: [
    {
      _id: mongoose.Types.ObjectId;
      recipient: mongoose.Types.ObjectId;
      sender: mongoose.Types.ObjectId;
      content: string;
      date: Date;
      read: boolean;
    }
  ];
}

export default IConversation;
