import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import validateMessageReq from "./Message.validation";
import Conversation from "../Conversation/Conversation.schema";
import User from "../User/User.schema";
import IUser from "../User/User.interface";

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

const conversationNotExist = async (recipient: string, senderId: string) => {
  const conversation = await Conversation.count({
    interlocutors: { $all: [recipient, senderId] },
  });
  return conversation === 0;
};

const createNewConversation = async (
  recipient: string,
  res: Response,
  sender: IUser,
  message: string
) => {
  const newConversation = new Conversation({
    interlocutors: [recipient, sender._id],
    messages: [message],
  });
  try {
    await newConversation.save();
    return res.status(CREATED).json(message);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
};

const addMessageToConversation = async (
  recipient: string,
  res: Response,
  senderId: string,
  message: any
) => {
  try {
    await Conversation.findOneAndUpdate(
      { interlocutors: { $all: [recipient, senderId] } },
      {
        $push: {
          messages: {
            $each: [message],
            $sort: { date: -1 },
          },
        },
      }
    );
    return res.status(CREATED).json(message);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { error } = validateMessageReq(req.body);
  if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
  const sender = await User.findById(req.user);
  if (!sender)
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  if (req.body.recipient == sender._id) {
    return res.status(BAD_REQUEST).send("You can't send a message to yourself");
  }
  const sentData = req.body;
  const defaultData = {
    sender: sender._id,
  };
  const message = { ...sentData, ...defaultData };

  if (await conversationNotExist(req.body.recipient, sender._id)) {
    return await createNewConversation(
      req.body.recipient,
      res,
      sender,
      message
    );
  }
  return await addMessageToConversation(
    req.body.recipient,
    res,
    sender._id,
    message
  );
};

export const updateReadMessagesByInterlocutorsId = async (
  req: Request,
  res: Response
) => {
  const sender = await User.findById(req.user);
  if (!sender)
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  try {
    await Conversation.updateOne(
      { interlocutors: { $all: [req.params.id, sender._id] } },
      {
        $set: {
          "messages.$[updateMessage].read": true,
        },
      },
      {
        arrayFilters: [{ "updateMessage.read": false, "updateMessage.recipient": sender._id }],
      }
    );
    return res.status(OK).send("Conversation status updated");
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
};
