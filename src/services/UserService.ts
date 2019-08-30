const dotEnv = require('dotenv');
import BaseService from "../base/BaseService";

dotEnv.config();

const { User } = require('../db/models');

export default class UserService extends BaseService<any> {

  constructor() {
    super(User);
  }

  static async findAllUsers() {
    const results = await User.findAll({})
    return results
  }
}

export const userService = new UserService();
