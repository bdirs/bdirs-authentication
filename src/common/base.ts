import bcrypt from "bcryptjs";
import supertest from "supertest";
import app from "../app";
import { userService } from "../services/user-service";

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
  public static token = null;
  public static app = supertest(app);

  public static __addAuthorization(request) {
    return this.token
      ? request.set("authorization", `Bearer ${this.token}`)
      : request;
  }

  public static post(url) {
    const request = this.app.post(url);

    return App.__addAuthorization(request);
  }
}
