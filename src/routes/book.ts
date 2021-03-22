import { Router } from 'express';
import checkToken from  'express-jwt';
import { addBook, deleteBook, getBookById, getBooks, updateBook } from '../entities/Book/Book.controller';

const router = Router();


router
    .get('', getBooks)
    .get('/:id', getBookById)
    .post('', 
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        addBook)
    .put('/:id',
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        updateBook)
    .delete('/:id',
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        deleteBook)


export default router;