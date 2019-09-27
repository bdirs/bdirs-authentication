import { roleNames } from "../../utils";
import { roleService } from "../roles-service";
import { userRolesService } from "../user-roles-service";

const { UserRole } = require("../../db/models");

describe("UserRoleService", () => {
  it("should return one user role", async () => {
    jest.spyOn(UserRole, "findOne").mockResolvedValueOnce({});
    const res = await userRolesService.findOne({});
    expect(res).toEqual({});
  });

  it("should create a user role", async () => {
    jest.spyOn(roleService, "findOne").mockResolvedValueOnce({id: 1});
    jest.spyOn(UserRole, "findOrCreate").mockResolvedValueOnce({});
    const res = await userRolesService.createUserRole(roleNames.SUPER_ADMIN, 1);
    expect(res).toEqual({});
  });
});
