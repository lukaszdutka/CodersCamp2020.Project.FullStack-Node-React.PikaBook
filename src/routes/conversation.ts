import { Router } from 'express';
import checkToken from  'express-jwt';
import { sendMessage, updateReadMessagesByInterlocutorsId } from '../entities/Message/Message.controller';

const router = Router();

// send a new message
router
    .post('', 
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        sendMessage);

//update read field of all messages in a conversation
router
    .put('/:id', 
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        updateReadMessagesByInterlocutorsId);

export default router;