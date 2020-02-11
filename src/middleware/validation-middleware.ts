import { NextFunction, Request, Response } from "express";
import { JoiHelper } from "../helpers";
import { addAdminSchema, userSchema } from "./schemas/users";

export const validateRequestBody = (req: Request, res: Response, next: NextFunction) => {
  return JoiHelper.validateRequestBody(
    req,
    res,
    next,
    userSchema,
  );
};

export const validateCreateAdmin = (req: Request, res: Response, next: NextFunction) => {
  return JoiHelper.validateRequestBody(
    req,
    res,
    next,
    addAdminSchema,
    );
};
