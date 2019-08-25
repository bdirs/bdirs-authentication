import { Request, Response } from "express";
import BaseController from "../../base/BaseController";
import { PasswordHelper, TokenHelper } from "../../helpers";
import { userService } from "../../services";
import { IUser } from "../../types";
import { HttpResponse, Validator } from "../../utils";

export default class UserController extends BaseController {
  constructor(service = userService, ModelN = "User") {
    super(service, ModelN);
  }
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
        "user with that username doesnot exist",
      );
    }
    return user;
  }
  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns @Promise<Response>
   */
  public async loginUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
    const verifiedUser = await this.validateUser(username, res) as IUser;
    const matchedPassword = await PasswordHelper.comparePassword(password, verifiedUser.password);
    const payload = { username: verifiedUser.username, email: verifiedUser.email };
    const data = {
      ...payload,
      access_token: await TokenHelper.generateToken(payload),
    };
    return matchedPassword ?
      HttpResponse.sendResponse(res, true, 200, null, data) :
      HttpResponse.sendResponse(res, false, 400, "username and passowrd don't match");
  }
}

const userController = new UserController(userService, "User");
export { userController };
