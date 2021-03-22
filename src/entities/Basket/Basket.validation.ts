import Joi, { ValidationResult } from 'joi';
import IBasket from './Basket.interface';

const validateBasketReq = (basket: IBasket): ValidationResult => {
    const schema = Joi.object({
      targetUserID: Joi.string().required(),
      booksOffered: Joi.array().items(Joi.string()),
      booksRequested: Joi.array().items(Joi.string()),
    })
    return schema.validate(basket);
}

export const validateBasketStatus = (status: string): ValidationResult => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'accepted', 'rejected', 'cancelled', 'offered', 'failedByRequestor','failedByTarget', 'success').required(),
  });
  return schema.validate(status);
}

export default validateBasketReq;