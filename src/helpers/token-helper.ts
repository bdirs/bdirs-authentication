import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export default class TokenHelper {
  /**
   * @param  {object} payload
   * @returns Promise
   */
  public static async generateToken(payload: object): Promise<string> {
    const signature: any = {algorithm: "HS256", expiresIn: "30d"};
    const token =  jwt.sign(payload, SECRET_KEY, signature);
    return token;
  }

  public static async decodeToken(token: string): Promise<any> {
      const decoded = await jwt.verify(token, SECRET_KEY);
      return decoded;
  }
}
