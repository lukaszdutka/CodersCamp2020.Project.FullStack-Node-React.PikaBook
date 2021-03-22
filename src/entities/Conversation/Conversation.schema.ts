import * as mongoose from "mongoose";
import IConversation from "./Conversation.interface";

const schema = new mongoose.Schema({
  interlocutors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  messages: [
    {
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
      content: String,
      date: {
        type: Date,
        default: Date.now,
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Conversation = mongoose.model<IConversation & mongoose.Document>(
  "Conversation",
  schema
);

export default Conversation;
