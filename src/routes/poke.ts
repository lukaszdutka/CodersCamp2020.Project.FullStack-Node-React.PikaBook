import { Router } from 'express';
import checkToken from  'express-jwt';
import { addPoke, updateReadStatus } from '../entities/Poke/Poke.controller';

const router = Router();


router
    .post('', 
        checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        addPoke)
    .put('/:id',
    checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), 
        updateReadStatus)

export default router;