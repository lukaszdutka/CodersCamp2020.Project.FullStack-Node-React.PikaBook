import Joi, { ValidationResult } from "joi";
import IMessage from "./Message.interface";

const validateMessageReq = (message: IMessage): ValidationResult => {
  const schema = Joi.object({
    recipient: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    content: Joi.string().min(1).required(),
  });
  return schema.validate(message);
};

export default validateMessageReq;
