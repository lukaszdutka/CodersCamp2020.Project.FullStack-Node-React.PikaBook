import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateAuthReq from './Auth.validation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../User/User.schema';

const { BAD_REQUEST, OK } = StatusCodes;


export const authenticateUser = async (req: Request, res: Response) => {
    const { error } = validateAuthReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(BAD_REQUEST).send("Invalid email or password");
    
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(BAD_REQUEST).send('Invalid email or password');
    
    const token = jwt.sign({_id: user._id}, `${process.env.JWT_PRIVATE_KEY}`);
    return res.status(OK).json({token});
}

