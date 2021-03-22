import UserRouter from './user';
import BookRouter from './book';
import BasketRouter from './basket';
import AuthRouter from './auth';
import PokeRouter from './poke';
import MeRouter from './me';
import ConversationRouter from './conversation'
import checkToken from  'express-jwt';
import { Router } from 'express';
import cors from "cors";


// Init router and path
const router = Router();

if (process.env.NODE_ENV === 'production') {
    // Add cors
    const corsOptions: cors.CorsOptions = {
        allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        ],
        credentials: true,
        methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    };
    
    //use cors middleware
    router.use(cors(corsOptions));
}


// Add sub-routes
router
    .use('/users', UserRouter)
    .use('/books', BookRouter)
    .use('/baskets', BasketRouter)
    .use('/auth', AuthRouter)
    .use('/me', checkToken({ secret: `${process.env.JWT_PRIVATE_KEY}`, algorithms: ['HS256']}), MeRouter)
    .use('/pokes', PokeRouter)
    .use('/conversations', ConversationRouter)

// Export the base-router
export default router;
