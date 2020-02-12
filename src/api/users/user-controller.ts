import { Request, Response} from "express";
import uuid from "uuid";
import BaseController from "../../base/BaseController";
import { FRONT_END_URL } from "../../config";
import { broadcastEvent } from "../../events";
import { events } from "../../events/events-constants";
import {
  PasswordHelper,
  sendPasswordResetEmail,
  TokenHelper,
} from "../../helpers";
import { userService } from "../../services";
import { IUser } from "../../services/user-service";
import { HttpResponse, Validator } from "../../utils";

export interface IRequest extends Request {
  user: IUser;
}

export default class UserController extends BaseController {
  /**
   * @param  {Request} req
   * @param  {Response} res
   */
  public async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
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

    const matchedPassword = await PasswordHelper.comparePassword(password, user.password);

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
      id: user.id };

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

  public async resetPasswordRequest(req: Request, res: Response): Promise<Response> {
    const{body: { email } } = req;
    const user = await this.service.findOne({ where: { email }, exclude: ["password"] });
    let token: string;
    if (user) {
      token = await TokenHelper.generateToken({email, id: user.id});
      const resetUrl: string = `${FRONT_END_URL}/password/${token}/confirmation`;
      await sendPasswordResetEmail({email: user.email, link: resetUrl});
    }
    return  HttpResponse.sendResponse(res, true, 200,
      `Password Reset Link was Sent to Your email. Please check ${email} inbox for further instructions`);
  }

  public async resetPasswordConfirmation(req: Request, res: Response) {
    try {
      const {email} = await TokenHelper.decodeToken(req.params.token);
      const user = await this.service.findOne({where: {email}});
      if (!user) {
        return HttpResponse.sendErrorResponse(res, 404, "User not Found", null);
      }
      const{ body: { password: newPassword, passwordConfirmation } } = req;
      if (newPassword !== passwordConfirmation) {
        return HttpResponse.sendErrorResponse(res, 400,
          "Password and password confirmation must match", null);
      }
      const password = await PasswordHelper.hashPassword(newPassword);
      await this.service.updateOne({ password }, {where: { email } });
      return HttpResponse.sendResponse(res, true, 500, "Password updated successfully");
    } catch (e) {
      return HttpResponse.sendErrorResponse(res, 500,
        "There is a problem with the link. Password reset couldn't be completed", e);
    }
  }
}

const userController = new UserController(userService, "User");
export { userController };
