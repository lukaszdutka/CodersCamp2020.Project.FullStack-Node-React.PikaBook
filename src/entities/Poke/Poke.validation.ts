import Joi, { ValidationResult } from 'joi';
import IPoke from './Poke.interface';

const validatePokeReq = (poke: IPoke): ValidationResult => {
    const schema = Joi.object({
      recipient: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
      books: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).required()
    })
    return schema.validate(poke);
}

export default validatePokeReq;
