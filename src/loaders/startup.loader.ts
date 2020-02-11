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
  userService,
} from "../services";

export default class StartUpHelper {

  public static async createAdmin(): Promise<void> {
    // Move to migrartion
    if (!SUPER_ADMIN_EMAIL
      || !SUPER_ADMIN_PASSWORD) {
       throw new Error("Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in env ");
    }
    const password = await PasswordHelper.hashPassword(SUPER_ADMIN_PASSWORD);
    const options = {
      defaults: {
        email: SUPER_ADMIN_EMAIL,
        password,
        role: "admin",
        username: "SuperAdmin",
        uuid: uuid()},
      where: {
        email: SUPER_ADMIN_EMAIL,
        username: "SuperAdmin",
        },
    };
    await userService.findOrCreate(options);
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
