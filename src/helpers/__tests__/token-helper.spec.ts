import jwt from "jsonwebtoken";
import { TokenHelper } from "..";
describe("TokenHelper", () => {
  it("should generate token", async () => {
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => jest.fn());
    await TokenHelper.generateToken({});
    expect(jwt.sign).toHaveBeenCalled();
  });
});
