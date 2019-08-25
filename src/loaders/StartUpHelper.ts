const uuid = require('uuid');
import {UserService} from "../services";

require('dotenv').config();

export default class StartUpHelper {

  static async createAdmin() {
    if(!process.env.SUPER_ADMIN_EMAIL
      || !process.env.SUPER_ADMIN_PASSWORD) {
       throw new Error('Missing SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD in env ');
    }
    const options = {
      defaults: {
        username: 'SuperAdmin',
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        uuid: uuid(),
        isAdmin: true},
      where: {
        username: 'SuperAdmin',
        email: process.env.SUPER_ADMIN_EMAIL}
    };
    const admin = await UserService.findOrCreate(options);
    return admin
  }
}
