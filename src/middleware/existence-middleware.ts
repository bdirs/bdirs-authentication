import { NextFunction, Request, Response } from "express";
import { userService} from "../services";
import {HttpResponse} from "../utils";

/**
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @returns Promise
 */
export const validateUserExistence = async (req: Request, res: Response, next: NextFunction) => {
  const {body: {email, username}} = req;
  const userByEmail = await userService.findOne({where: {email}});
  const userByUsername = await userService.findOne({where: {username}});
  if (userByEmail || userByUsername) {
    const emailOrUsernameMessage = userByUsername ?   "Username already taken" : "Email already taken";
    const message = userByEmail && userByUsername ? "Both email and username are already taken" :
      emailOrUsernameMessage;
    return HttpResponse.sendResponse(res, false, 409, message);
  }
  next();
};

/**
 * description validate user exists by uuid
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const validateUserExistenceByUuid = async (req: Request, res: Response, next: NextFunction) => {
  const{params: {uuid}} = req;
  const user = await userService.findOne({where: {uuid}});
  if (!user) {
    return HttpResponse.sendErrorResponse(res, 404, "User Not Found", null);
  }
  next();
};
