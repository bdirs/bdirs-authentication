import {FindOptions} from "sequelize";
import BaseService from "../base/BaseService";
import { User } from "../db/models/user";

export interface IUser {
  username?: string;
  password?: string;
  id?: number;
  email?: string;
  dataValues?: any;
  role?: string;
  uuid?: string;
  avatar?: string;
}

export default class UserService extends BaseService<IUser> {
  constructor() {
    super(User, ["password"]);
  }

  public async findAll(options: FindOptions, exclude?: boolean): Promise<IUser[]> {
    return super.findAll(options, true);
  }
}

const userService = new UserService();
export { userService };
