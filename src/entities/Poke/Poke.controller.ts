import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import validatePokeReq from "./Poke.validation";
import User from "../User/User.schema";
import Poke from "./Poke.schema";
import Book from "../Book/Book.schema";
import { ObjectId } from "mongodb";

const { BAD_REQUEST, CREATED, NOT_FOUND, OK } = StatusCodes;

const checkBookOwnership = async (
  bookID: ObjectId,
  req: Request,
  res: Response
) => {
  const book = await Book.findById(bookID);
  if (book === null) {
    return res
      .status(NOT_FOUND)
      .send(`Book ${bookID.toString()} do not exist`);
  }
  if (!book.ownerId?.equals(req.body.recipient)) {
    return res.status(BAD_REQUEST).send("Books do not belong to the recipient");
  }
};

export const addPoke = async (req: Request, res: Response) => {
  const { error } = validatePokeReq(req.body);
  if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
  const sender = await User.findById(req.user);
  if (!sender)
    return res.status(BAD_REQUEST).send("The sender is not a logged user");
  if (req.body.recipient == sender._id) {
    return res.status(BAD_REQUEST).send("Can't send a message to yourself");
  }
  const pokeData = req.body;
  const senderData = { sender: sender._id };
  const books: ObjectId[] = req.body.books;
  books.forEach((bookID) => checkBookOwnership(bookID, req, res));
  const poke = new Poke({ ...pokeData, ...senderData });
  try {
    await poke.save();
    return res.status(CREATED).json(poke);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
};

export const updateReadStatus = async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    if (!user) return res.status(BAD_REQUEST).send("There is no logged user");
    const poke = await Poke.findById(req.params.id);
    if (!poke) return res.status(NOT_FOUND).send("Poke does not exist");
    if (!poke.recipient.equals(user._id)) {
        return res.status(BAD_REQUEST).send("Can't update another user's conversation")}
    try {
        await Poke.findByIdAndUpdate(req.params.id, { $set: { read: true } })
        return res.status(OK).send("Poke status updated");
  } catch (error) {
    return res.status(BAD_REQUEST).send(error._message);
  }
}

