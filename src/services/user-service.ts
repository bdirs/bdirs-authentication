import BaseService from "../base/BaseService";
import { IUser } from "../types";
const { User } = require("../db/models");

export default class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }

}

const userService = new UserService();
export { userService };
