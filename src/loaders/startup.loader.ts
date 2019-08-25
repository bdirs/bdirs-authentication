import uuid from "uuid";
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } from "../config";
import { PasswordHelper } from "../helpers";
import { userService } from "../services";

export default class StartUpHelper {

  public static async createAdmin(): Promise<void> {
    if (!SUPER_ADMIN_EMAIL
      || !SUPER_ADMIN_PASSWORD) {
       throw new Error("Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in env ");
    }
    const password = await PasswordHelper.hashPassword(SUPER_ADMIN_PASSWORD);
    const options = {
      defaults: {
        email: SUPER_ADMIN_EMAIL,
        isAdmin: true,
        password,
        username: "SuperAdmin",
        uuid: uuid()},
      where: {
        email: SUPER_ADMIN_EMAIL,
        username: "SuperAdmin",
        },
    };
    await userService.findOrCreate(options);
  }
}
