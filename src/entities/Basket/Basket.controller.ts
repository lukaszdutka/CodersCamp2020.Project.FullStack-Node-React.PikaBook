import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBasketReq from './Basket.validation';
import Basket from './Basket.schema';
import User from '../User/User.schema'
import Book from '../Book/Book.schema'

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export const addBasket = async (req: Request, res: Response) => {
    const { error } = validateBasketReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

    const user = await User.findById(req.user)
    if (user?._id == req.body.targetUserID) return res.status(BAD_REQUEST).send('targetUserID should be different that createdByUserId')
    
    const booksToOffer = await Book.find({ownerId: req.user});
    const booksToOfferId: string[] = booksToOffer.map( book => book._id.toString());
    const booksToOfferFromReqBody: string[] = req.body.booksOffered
    if (!booksToOfferFromReqBody.every(bookId => booksToOfferId.indexOf(bookId) > -1)) {
        return res.status(BAD_REQUEST).send("You are offering a book that you don't have.")
    }

    const booksToRequest = await Book.find({ownerId: req.body.targetUserID});
    const booksToRequestId: string[] = booksToRequest.map( book => book._id.toString());
    const booksToRequestFromReqBody: string[] = req.body.booksRequested
    if (!booksToRequestFromReqBody.every(bookId => booksToRequestId.indexOf(bookId) > -1)) {
        return res.status(BAD_REQUEST).send("You are requesting a book that target user doesn't have.")
    }

    const basketData = req.body;
    const createdByUserId = {createdByUserId: req.user}
    const basket = new Basket({...basketData, ...createdByUserId})
    try {
        await basket.save()
        return res.status(CREATED).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}