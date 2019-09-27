import { Request } from "express";
import { roleService, userService } from "../../services";
import { IUser } from "../../types";
import { HttpResponse } from "../../utils";
import { validateRoleExistence, validateUserExistence } from "../existence-middleware";

const req = {
    headers: {},
    body: {},
} as Request;
let res;
const next = jest.fn();
describe("Existence Middleware", () => {
    beforeAll(() => {
        jest.spyOn(HttpResponse, "sendResponse");
        res = {
            status: jest.fn(() => ({
              send: jest.fn(),
            })).mockReturnValue({send: jest.fn()}),
          };
    });

    describe("Role Existence", () => {
        it("should send response if role doesnot exist", async () => {
            req.body.roleId = 1;
            jest.spyOn(roleService, "findOne").mockResolvedValueOnce(null);
            await validateRoleExistence(req, res, next);
            expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 404, "Role Not Found");

        });

        it("should call next if role exists", async () => {
            req.body.roleId = 1;
            jest.spyOn(roleService, "findOne").mockResolvedValueOnce({});
            await validateRoleExistence(req, res, next);
            expect(next).toBeCalled();

        });
    });

    describe("User Existence", () => {
         const mockuser: IUser = {
             id: 1,
             username: "dee",
             email: "email",
             password: "password",
         };
         it("should send response if user  exist", async () => {
            req.body.email = "test@gmail.com";
            req.body.username = "test@gmail.com";
            jest.spyOn(userService, "findOne").mockResolvedValue(mockuser);
            await validateUserExistence(req, res, next);
            expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 409, "Both email and username are already taken");

        });

         it("should call next if user doesnot exists", async (done) => {
            req.body.email = "test@gmail.com";
            req.body.username = "test@gmail.com";
            jest.spyOn(userService, "findOne").mockResolvedValue(null);
            await validateUserExistence(req, res, next);
            expect(next).toHaveBeenCalled();
            done();
        });
    });
});
