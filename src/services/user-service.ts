import BaseService from "../base/BaseService";
import { User } from "../db/models/user";

export interface IUser {
  username?: string;
  password?: string;
  id?: number;
  email?: string;
  dataValues?: any;
  role?: string;
}

export default class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }

}

const userService = new UserService();
export { userService };
