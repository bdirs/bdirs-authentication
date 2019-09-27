import * as Sentry from "@sentry/node";
import uuid from "uuid";
import {
  DSN,
  NODE_ENV,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASSWORD,
} from "../config";
import { registerEvents } from "../events";
import { PasswordHelper } from "../helpers";
import {
  roleService,
  userRolesService,
  userService,
} from "../services";

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
    const {dataValues: { id: userId } } = await userService.findOrCreate(options);
    const {id: roleId} = await roleService.findOne({where: {name: "superAdmin"}});
    await userRolesService.findOrCreate({ where: { userId, roleId } });
}
  /**
   * @returns void
   * @description loads Sentry for error reporting
   */
  public static loadSentry(): void {
    // TODO research on a better error reporter
    // if (NODE_ENV === "production") {
    //   Sentry.init({
    //     dsn: DSN,
    //   });
    // }
  }
  /**
   * @returns void
   * @description registers all application events
   */
  public static loadEvents(): void {
    registerEvents();
  }
}
