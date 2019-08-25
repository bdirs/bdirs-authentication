import BaseService from "../base/BaseService";
import { IUserType } from "../types";
const { User } = require('../db/models');

class UserService extends BaseService<IUserType>{
  constructor() {
    super(User)
  }

}

const userService = new UserService();
export default userService;
