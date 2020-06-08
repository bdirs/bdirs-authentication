import { NextFunction, Response } from "express";
import { IRequest } from "../api/users/user-controller";
import { TokenHelper } from "../helpers";
import { HttpResponse } from "../utils";
import { roleNames } from "../utils";

/**
 * @param  {IRequest} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description checks if there is a valid token in authorization header
 */
export const isAuthenticated = async (req: IRequest, res: Response, next: NextFunction) => {
  const {headers: {authorization}} = req;
  if (!authorization) {
    return HttpResponse.sendResponse(
      res,
      false,
      401,
      "Not Authorised",
    );
  }
  try {
    const user = await TokenHelper.decodeToken(authorization);
    req.user = user;
    next();
  } catch (e) {
    return HttpResponse.sendResponse(
      res,
      false,
      500,
       e.message || "Token is Invalid");
  }
};

/**
 * @param  {IRequest} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description Checks if user is a superAdmin
 */
export const isSuperAdmin = async (req: IRequest, res: Response, next: NextFunction) => {
const {user: {role}} = req;
if (role !== roleNames.SUPER_ADMIN) {
  return HttpResponse.sendResponse(
    res,
    false,
    401,
    "Permission Denied");
  }
next();
};
