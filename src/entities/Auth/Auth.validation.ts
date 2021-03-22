import Joi, { ValidationResult } from "joi";
import IAuthReq from './Auth.interface';

const validateAuthReq = (authReq: IAuthReq): ValidationResult => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(authReq);
}

export default validateAuthReq