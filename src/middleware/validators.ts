import { JoiValidator } from ".";
import { userSchema } from "./Joi/schemas/users";

export const validateRequestBody = (req, res, next) => {
  return JoiValidator.validateRequestBody(
    req,
    res,
    next,
    userSchema,
  );
};
