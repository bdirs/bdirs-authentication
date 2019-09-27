import BaseService from "../base/BaseService";
import { IUserRole } from "../types";
import {roleService} from "./roles-service";
const { UserRole, Role } = require("../db/models");

export default class UserRolesService extends BaseService<IUserRole> {
  constructor() {
    super(UserRole);
  }
  /**
   * @param  {object} options
   * @returns @Promise
   * @description returns user userRole
   */
  public async findOne(options: object): Promise<IUserRole> {
    const userRole = await this.model.findOne({
      ...options,
      include: [{model: Role, as: "role" }],
    });
    return userRole;
  }
  /**
   * @param  {string} roleName
   * @param  {number} userId
   * @returns Promise
   */
  public async createUserRole(roleName: string, userId: number): Promise<any> {
    const {id: roleId} = await roleService.findOne({where: {name: roleName}});
    const newUserRole = await this.model.findOrCreate(
      {where: {roleId, userId}});
    return newUserRole;
  }
}

const userRolesService = new UserRolesService();
export { userRolesService };
