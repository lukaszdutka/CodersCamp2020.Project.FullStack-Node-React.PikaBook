import { Request } from 'express';
import { User } from '@entities/User/User.interface';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: User;
        // book: Book;
    }
} 
