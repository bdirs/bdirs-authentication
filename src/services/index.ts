// will contain all our services that interact with database
import RoleService from "./roles-service";
import UserService, { userService } from "./user-service";
export { roleService } from "./roles-service";
export { userRolesService } from  "./user-roles-service";
export { emailService } from "./email-service";

export {
  userService,
  UserService,
  RoleService,
};
