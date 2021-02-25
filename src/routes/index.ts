import UserRouter from './Users';import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
const {  OK } = StatusCodes;


// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);

router.get('', (req: Request, res: Response) => {
    return res.status(OK).send('Pikachu');
});

// Export the base-router
export default router;
