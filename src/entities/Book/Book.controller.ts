import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBookReq from './Book.validation';
import Book from '../../entities/Book/Book.schema';
import User from '../../entities/User/User.schema';
import { NOTFOUND } from 'node:dns';

const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;


export const getBooks = async (req: Request, res: Response) => {
    let { name, location } = req.query;
    let books = {}
    if (location && name){
        const users = await User
        .find({ location: new RegExp(location.toString(), "i")}, '_id');
        const userIds = users.map((val) => val._id.toString());
        books = await Book.find({ownerId: { $in: userIds}, name: new RegExp(name.toString(), "i")})
                        .populate('ownerId', ['location', 'name'])
    }
    else if (name) {
        books = await Book
        .find({name: new RegExp(name.toString(), "i")})
        .populate('ownerId', ['location', 'name']);
    }
    else if (location) {
        const users = await User
        .find({ location: new RegExp(location.toString(), "i")}, '_id');
        const userIds = users.map((val) => val._id.toString());
        books = await Book.find({ownerId: { $in: userIds}})
                        .populate('ownerId', ['location', 'name'])
    } else {
        books = await Book.find({})
            .populate('ownerId', ['location', 'name'])
    }
    return res.status(OK).json(books)
}


export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await Book
            .findById(req.params.id)
            .populate('ownerId', ['location', 'name']);
        if (!book) return res.status(NOT_FOUND).send('Book not found');
        return res.status(OK).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const addBook = async (req: Request, res: Response) => {
    const { error } = validateBookReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    const bookData = req.body;
    const ownerData = {ownerId: req.user}
    const book = new Book({...bookData, ...ownerData})
    try {
        await book.save()
        return res.status(CREATED).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error._message);
    }
}

export const updateBook = async (req: Request, res: Response) => {
    const { error } = validateBookReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    try {
        const book = await Book
            .findOneAndUpdate({ _id: req.params.id, ownerId: req.user }, 
                { $set: req.body }, 
                { new: true })
            .populate('ownerId', 'name')
        if (!book) return res.status(NOT_FOUND).send('There is no book to be updated')
        return res.status(OK).json(book);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const deleteBook = async (req: Request, res: Response) => { 
    try {
        const deletedBook = await Book
            .findOneAndRemove({ _id: req.params.id, ownerId: req.user });
        if (!deletedBook) return res.status(NOT_FOUND).send('There is no book to be deleted')
        return res.status(OK).json(deletedBook);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }  
}
