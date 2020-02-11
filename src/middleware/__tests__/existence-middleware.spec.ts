import { Request } from "express";
import { userService } from "../../services";
import { IUser } from "../../services/user-service";
import { HttpResponse } from "../../utils";
import { validateUserExistence } from "../existence-middleware";

const req = {
    body: {},
    headers: {},
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
