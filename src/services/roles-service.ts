import BaseService from "../base/BaseService";
import { IRole } from "../types";
const { Role } = require("../db/models");

export default class RoleService extends BaseService<IRole> {
  constructor() {
    super(Role);
  }
}

const roleService = new RoleService();
export { roleService };
