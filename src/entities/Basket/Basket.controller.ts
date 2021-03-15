import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import validateBasketReq, { validateBasketStatus } from './Basket.validation';
import Basket from './Basket.schema';
import User from "../User/User.schema"

const { BAD_REQUEST, FORBIDDEN, CREATED, OK, NOT_FOUND } = StatusCodes;

export const getBasketById = async (req: Request, res: Response) => {
    const user = await User.findById(req.user);
    try {
        const basket = await Basket
            .findById(req.params.id)
            .populate('createdByUserId', 'name')
            .populate('targetUserID', 'name')
            .populate('booksOffered', 'name')
            .populate('booksRequested', 'name')
        if (!basket?.createdByUserId?.equals(user?._id) && !basket?.targetUserID.equals(user?._id)) {
            return res.status(FORBIDDEN).send("Basket does not belong to the user")}   
        return res.status(OK).json(basket);
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}

export const addBasket = async (req: Request, res: Response) => {
    const { error } = validateBasketReq(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);
    
    const user = await User.findById(req.user)
    if (user?._id == req.body.targetUserID) return res.status(BAD_REQUEST).send('targetUserID should be different that createdByUserId')
    
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

export const updateBasket = async (req: Request, res: Response) => {
    
    const { error } = validateBasketStatus(req.body);
    if (error) return res.status(BAD_REQUEST).send(error.details[0].message);

    const user = await User.findById(req.user);
    if (!user)
    return res.status(BAD_REQUEST).send("The user is not logged in");

    try {
        const basket = await Basket
        .findById( { _id: req.params.id })
        .populate('createdByUserId', 'name')
        .populate('targetUserID', 'name')
        
        if (!basket) {
            return res.status(NOT_FOUND).send('There is no basket to be updated')
        }

        if( basket.createdByUserId ) {
            if (!basket.createdByUserId.equals(user._id) && !basket.targetUserID.equals(user._id)) {
                return res.status(FORBIDDEN).send("Basket does not belong to the user");
            }
        } 

        if (basket.status === req.body.status) {
            return res.status(OK).send('Basket status did not change (new status is same as current status)');
        }

        await Basket.updateOne( { _id: req.params.id }, { status: req.body.status });
        return res.status(OK).send("Basket status updated");
    } catch (error) {
        return res.status(BAD_REQUEST).send(error.message);
    }
}