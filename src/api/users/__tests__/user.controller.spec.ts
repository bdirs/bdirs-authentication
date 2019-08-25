import { Request, Response } from "express";
import { TokenHelper } from "../../../helpers";
import { PasswordHelper } from "../../../helpers";
import { userService } from "../../../services";
import { HttpResponse } from "../../../utils/";
import { userController } from "../user-controller";

export const mockUser = {id: 1, username: "dee", password: "random"};
describe("UserController", () => {
  const req = {} as Request;
  const res =  {} as Response;
  beforeEach(() => {
    res.status = jest.fn().mockReturnValue({send: jest.fn()});
    jest.spyOn(HttpResponse, "sendResponse");
  });

  it("should send error response if user doesnot exist", async () => {
    jest.spyOn(userService, "findOne").mockResolvedValue(null);
    req.body = {username: "SuperAdmin", password: "password"};
    await userController.validateUser("dee@gmail.com", res);
    expect(HttpResponse.sendResponse).toBeCalled();
  });

  it("should return user if they exist", async () => {
    jest.spyOn(userService, "findOne").mockResolvedValue(mockUser);
    req.body = {username: "SuperAdmin", password: "password"};
    const user = await userController.validateUser("dee@gmail.com", res);
    expect(user).toBeDefined();
  });

  it("login user if password match", async () => {
    const mockData = {access_token: "token", email: undefined, username: "dee"};
    req.body = {username: "SuperAdmin", password: "password"};
    jest.spyOn(userController, "validateUser").mockResolvedValue(mockUser);
    jest.spyOn(PasswordHelper, "comparePassword").mockResolvedValue(true);
    jest.spyOn(TokenHelper, "generateToken").mockResolvedValue("token");
    await userController.loginUser(req, res);
    expect(HttpResponse.sendResponse).toHaveBeenCalledWith(res, true, 200, null, mockData );
  });

  it("should throw error if password doesnot match", async () => {
    req.body = {username: "SuperAdmin", password: "password"};
    jest.spyOn(userController, "validateUser").mockResolvedValue(mockUser);
    jest.spyOn(PasswordHelper, "comparePassword").mockResolvedValue(false);
    await userController.loginUser(req, res);
    expect(HttpResponse.sendResponse).toHaveBeenCalledWith(res, false, 400,
        "username and passowrd don't match");
  });
});
