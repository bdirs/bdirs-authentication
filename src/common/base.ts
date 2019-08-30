import supertest from "supertest";
import bcrypt from 'bcryptjs';
import app from "../app";
import { userService } from "../services/UserService";

interface UserData {
  password: string;
  email: string;
  username: string;
}

export const createUser = async (data: UserData): Promise<any> => {
  await deleteAllUserRecords();
  const payload = {...data, password: bcrypt.hashSync(data.password, 8)};
  const newUser = await userService.createOne(payload);
  return newUser;
};

export const deleteAllUserRecords = async (): Promise<void> => {
  await userService.deleteOne({where: {}});
};

export class App {
  static token = null;
  static app = supertest(app);

  static __addAuthorization(request) {
    return this.token
      ? request.set('authorization', `Bearer ${this.token}`)
      : request;
  }

  static post(url) {
    const request = this.app.post(url);

    return App.__addAuthorization(request);
  }
}
