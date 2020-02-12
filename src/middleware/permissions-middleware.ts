import {NextFunction, Response} from "express";
import {IRequest} from "../api/users/user-controller";
import {HttpResponse} from "../utils";

/**
 * @param  {IRequest} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description Checks if user is a profile owner
 */
export const isProfileOwner = async (req: IRequest, res: Response, next: NextFunction) => {
  const{params: {id}, user} = req;
  if (Number(id) !== user.id) {
    return HttpResponse.sendResponse(res, false, 403, "Permission Denied");
  }
  next();
};
