import Joi, { ValidationResult } from "joi";
import IUser from "./User.interface"

const validateUser = (user: IUser): ValidationResult => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(), 
        password: Joi.string().min(5).max(255).required(),
        location: Joi.string()
    })
    return schema.validate(user);
}

export default validateUser