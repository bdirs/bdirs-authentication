import BaseController from "../../base/BaseController";
import {roleService} from "../../services";

export default class RolesController extends BaseController {
  constructor(service = roleService, ModelN = "Roles") {
    super(service, ModelN);
  }
}

const rolesController = new RolesController();
export { rolesController };
