import { Request, Response } from "express";
import uuid from "uuid";
import BaseController from "../../base/BaseController";
import { broadcastEvent } from "../../events";
import {events} from "../../events/events-constants";
import {
  PasswordHelper,
  TokenHelper,
} from "../../helpers";
import { userService } from "../../services";
import {IUser} from "../../services/user-service";
import { HttpResponse, Validator } from "../../utils";
import {roleNames} from "../../utils";

export interface IRequest extends Request {
  user: IUser;
}

export default class UserController extends BaseController {
  /**
   * @param  {string} username
   * @param  {Response} res
   * @returns Promise<any>
   */
  public async validateUser(username: string, res: Response): Promise<any> {
    const user: IUser  = Validator.validateEmail(username) ?
      await userService.findOne({where: {email: username}}) :
      await userService.findOne({where: {username}});
    if (!user) {
      return HttpResponse.sendResponse(
        res,
        false,
        400,
        "user with that username doesn't exist",
      );
    }
    return user;
  }
  /**
   * @param  {Request} req
   * @param  {Response} res
   */
  public async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const verifiedUser = await this.validateUser(username, res) as IUser;
    const matchedPassword = await PasswordHelper.comparePassword(password, verifiedUser.password);
    const payload = {
      username: verifiedUser.username,
      email: verifiedUser.email,
      role: verifiedUser.role,
      id: verifiedUser.id };
    const data = {
      ...payload,
      access_token: await TokenHelper.generateToken(payload),
    };
    return matchedPassword ?
      HttpResponse.sendResponse(res, true, 200, null, data) :
      HttpResponse.sendResponse(res, false, 400,
        "username and password don't match");
  }
  /**
   * @param  {IRequest} req
   * @param  {Response} res
   * @returns @Promise
   */
  public async addAdmin(req: IRequest, res: Response): Promise<Response> {
    try {
      const { body, user: {username}} = req;
      const {password} = body;
      const data = {...body, password: await PasswordHelper.hashPassword(password), uuid: uuid()};
      const user = await userService.createOne(data);
      const emailData = {...user.dataValues, password, addedBy: username};
      broadcastEvent(events.NEW_ADD_ADMIN_REGISTRATION_EMAIL, emailData);
      return HttpResponse.sendResponse(res, true, 200,
        "Admin user created successfully", user);
    } catch (e) {
      return HttpResponse.sendErrorResponse(res, 500, "Something went wrong", e);
    }

  }
}

const userController = new UserController(userService, "User");
export { userController };
