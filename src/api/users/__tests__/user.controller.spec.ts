import { Response } from "express";
import { PasswordHelper, TokenHelper } from "../../../helpers";
import {  userService } from "../../../services";
import { HttpResponse } from "../../../utils/";
import { IRequest } from "../user-controller";

export const mockUser = {id: 1, username: "dee", password: "random"};
//TODO add supertest tests
describe("UserController", () => {
  const req = {} as IRequest;
  const res =  {} as Response;
  beforeEach(() => {
    res.status = jest.fn().mockReturnValue({send: jest.fn()});
    jest.spyOn(HttpResponse, "sendResponse");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should send error response if user doesnot exist", async () => {
    jest.spyOn(userService, "findOne").mockResolvedValue(null);
    req.body = {username: "SuperAdmin", password: "password"};
  });

  it("should return user if they exist", async () => {
    jest.spyOn(userService, "findOne").mockResolvedValue(mockUser);
    req.body = {username: "SuperAdmin", password: "password"};
  });

  it("login user if password match", async () => {
    const mockData = {access_token: "token", email: undefined, username: "dee"};
    req.body = {username: "SuperAdmin", password: "password"};
    jest.spyOn(PasswordHelper, "comparePassword").mockResolvedValue(true);
    jest.spyOn(TokenHelper, "generateToken").mockResolvedValue("token");
  });

  it("should throw error if password doesnot match", async () => {
    req.body = {username: "SuperAdmin", password: "password"};
    jest.spyOn(PasswordHelper, "comparePassword").mockResolvedValue(false);
  });

  it("should successfully add admin user", async () => {
    jest.spyOn(userService, "createOne").mockResolvedValueOnce({id: 1,
      username: "dee", dataValues: {email: "email@test.com", password: "passwoed"},
     email: "email@test.com", password: "passwoed"});
  });
});
