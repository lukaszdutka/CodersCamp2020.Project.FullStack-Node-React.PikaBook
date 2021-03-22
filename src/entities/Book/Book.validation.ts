import Joi, { ValidationResult } from 'joi';
import IBook from './Book.interface';

const validateBookReq = (book: IBook): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().required(),
      author: Joi.array().items(Joi.string()),
      genres: Joi.array().items(Joi.string()),
      year: Joi.number(),
      publisher: Joi.string(),
      description: Joi.string(),
    })
    return schema.validate(book);
}

export default validateBookReq;
