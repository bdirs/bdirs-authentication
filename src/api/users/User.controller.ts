import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const dotEnv = require('dotenv');

import { userService } from '../../services';
import BaseController from '../../base/BaseController';
import { HttpResponse } from "../../utils";
import { Validator } from '../../utils';
dotEnv.config();

export default class UserController extends BaseController {
  constructor(service = userService, ModelN = 'User') {
    super(service, ModelN);
  }

  generateToken (payload: object): any {
    const signature: object = {algorithm: "HS256", expiresIn: "30d"};
    return jwt.sign(payload, signature, process.env.SECRET_KEY );
  }

  async loginUser(req, res): Promise<any> {
    const { username, password } = req.body;
    let user: any = null;
    if (Validator.validateEmail(username)) {
      user = await userService.findOne({where: {email: username}});
    } else {
      user = await userService.findOne({where: {username: username}});
    }
    // console.log('[[[[[[[[[', user);
    if (!user) {
      return HttpResponse.sendResponse(
        res,
        false,
        400,
        "user with that username doesnot exist",
      );
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    const payload = { username: user.username, email: user.email };
    const data: object = {
      ...payload,
      access_token: this.generateToken(payload),
    };
    return !matchedPassword ?
      HttpResponse.sendResponse(res, true, 200, null, data):
      HttpResponse.sendResponse(res, false, 400, "username and passowrd don't match");
  }
}

export const user = new UserController(userService, "User");
