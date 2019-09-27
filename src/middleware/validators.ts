import { NextFunction, Request, Response } from "express";
import { JoiValidator } from ".";
import { addAdminSchema, userSchema } from "./Joi/schemas/users";

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  return JoiValidator.validateRequestBody(
    req,
    res,
    next,
    userSchema,
  );
};

export const validateCreateAdmin = (req: Request, res: Response, next: NextFunction) => {
  return JoiValidator.validateRequestBody(
    req,
    res,
    next,
    addAdminSchema,
    );
};
