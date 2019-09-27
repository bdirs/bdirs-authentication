import { IRole } from "./roles-type";

export interface IUserRole {
  id?: number;
  userId: number;
  roleId: number;
  role?: IRole
}
