import { Response } from "express";
import uuid from "uuid";
import { PasswordHelper, TokenHelper } from "../../../helpers";
import * as helpers from  "../../../helpers";
import {  userService } from "../../../services";
import { HttpResponse } from "../../../utils/";
import { IRequest, userController } from "../user-controller";

export const mockUser = {id: 1, username: "dee", password: "random", email: "email@test.com"};

// TODO add supertest tests

describe("UserController", () => {
  const req = {params: {}} as IRequest;
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

  describe("PasswordReset", () => {
    req.body = { email: mockUser.email };
    req.params.token = "token";
    it("should send password reset email", async () => {
      jest.spyOn(userController.service, "findOne").mockResolvedValue(mockUser);
      jest.spyOn(helpers, "sendPasswordResetEmail").mockResolvedValue();
      jest.spyOn(TokenHelper, "generateToken").mockResolvedValue("token");
      jest.spyOn(HttpResponse, "sendResponse");
      await userController.resetPasswordRequest(req, res);
      expect(helpers.sendPasswordResetEmail).toBeCalled();
      expect(HttpResponse.sendResponse).toBeCalled();
    });

    it("should not send password reset email is user doesn't exist", async () => {
      jest.spyOn(userController.service, "findOne").mockResolvedValue(null);
      await userController.resetPasswordRequest(req, res);
      expect(helpers.sendPasswordResetEmail).not.toBeCalled();
    });

    it("should send error response if user doesn't exist", async () => {
      jest.spyOn(TokenHelper, "decodeToken").mockResolvedValue(mockUser);
      jest.spyOn(userController.service, "findOne").mockResolvedValue(null);
      jest.spyOn(HttpResponse, "sendErrorResponse");
      await userController.resetPasswordConfirmation(req, res);
      expect(HttpResponse.sendErrorResponse).toHaveBeenCalledWith(res, 404, "User not Found", Error("User not Found"));
    });

    it("should send error response if password and passwordConfirmation don't match", async () => {
      jest.spyOn(TokenHelper, "decodeToken").mockResolvedValue(mockUser);
      jest.spyOn(userController.service, "findOne").mockResolvedValue(mockUser);
      jest.spyOn(HttpResponse, "sendErrorResponse");
      req.body = {
        ...req.body,
        password: "password",
        passwordConfirmation: "passwo1",
      };
      await userController.resetPasswordConfirmation(req, res);
      expect(HttpResponse.sendErrorResponse).toHaveBeenCalledWith(res, 400, "Password and password confirmation must match", Error("Password and password confirmation must match"));
    });

    it("should update user successfully", async () => {
      jest.spyOn(TokenHelper, "decodeToken").mockResolvedValue(mockUser);
      jest.spyOn(userController.service, "findOne").mockResolvedValue(mockUser);
      jest.spyOn(HttpResponse, "sendResponse");
      jest.spyOn(userController.service, "updateOne").mockResolvedValue(1);
      req.body = {
        ...req.body,
        password: "password",
        passwordConfirmation: "password",
      };
      await userController.resetPasswordConfirmation(req, res);
      expect(HttpResponse.sendResponse).toHaveBeenCalled();
    });
  });

  describe("FindOne", () => {
    req.params = {
      uuid: uuid.v4(),
    };
    it("should return existing user", async () => {
      jest.spyOn(userController.service, "findOne").mockResolvedValue(mockUser);
      jest.spyOn(HttpResponse, "sendResponse");
      await userController.findOneRecord(req, res);
      expect(HttpResponse.sendResponse).toHaveBeenCalledWith(res, true, 200, null, mockUser);
    });

    it("should return 404 if user doesn't exist", async () => {
      jest.spyOn(userController.service, "findOne").mockResolvedValue(null);
      jest.spyOn(HttpResponse, "sendErrorResponse");
      await userController.findOneRecord(req, res);
      expect(HttpResponse.sendErrorResponse).toHaveBeenCalledWith(res, 404, "User not Found", Error("User Not Found"));
    });
  });

  describe("Me", () => {
    it("should return current user profile", async () => {
      req.user = mockUser;
      jest.spyOn(HttpResponse, "sendResponse");
      await userController.me(req, res);
      expect(HttpResponse.sendResponse).toHaveBeenCalledWith(res, true, 200, null, mockUser);
    });
  });
});
