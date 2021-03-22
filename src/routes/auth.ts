import { Router } from 'express';
import { authenticateUser } from '../entities/Auth/Auth.controller';


const router = Router();

// authenticate users
router.post('/', authenticateUser);

export default router;