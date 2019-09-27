import { TokenHelper } from "../../helpers";
import { IRequest } from "../../types";
import { HttpResponse, roleNames } from "../../utils";
import { isAuthenticated, isSuperAdmin } from "../authentication-middleware";

const req = {
    headers: {},
    user: {},
} as IRequest;
let res;
const next = jest.fn();
describe("authentication-middleware", () => {
    beforeAll(() => {
        res = {
            status: jest.fn(() => ({
              send: jest.fn(),
            })).mockReturnValue({send: jest.fn()}),
          };
        jest.spyOn(HttpResponse, "sendResponse");
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    describe("isAuthenticated", () => {
        it("call next if user is authenticated", async () => {
            jest.spyOn(TokenHelper, "decodeToken").mockResolvedValue({});
            req.headers.authorization = "token";
            await isAuthenticated(req, res, next);
            expect(next).toBeCalled();

        });

        it("should sendResponse error if authorization is missing", async () => {
            req.headers.authorization = null;
            await isAuthenticated(req, res, next);
            expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 400, "Missing Authorization Header");
        });

        it("should send error if token is invalid", async () => {
            req.headers.authorization = "token";
            jest.spyOn(TokenHelper, "decodeToken").mockRejectedValueOnce(new Error("Invalid token"));
            await isAuthenticated(req, res, next);
            expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 500, "Invalid token");

        });
    });

    describe("isSuperAdmin", () => {
        it("should call next is user is superadmin", async () => {
            req.user.role = roleNames.SUPER_ADMIN;
            await isSuperAdmin(req, res, next);
            expect(next).toBeCalled();
        });

        it("should throw permission error if user is not superAdmin", async () => {
            req.user.role = roleNames.USER;
            await isSuperAdmin(req, res, next);
            expect(HttpResponse.sendResponse).toBeCalledWith(res, false, 401, "Permission Denied");
        });
    });
});
