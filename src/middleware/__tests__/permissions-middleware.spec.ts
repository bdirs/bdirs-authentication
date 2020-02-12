import { mockUser } from "../../api/users/__tests__/user.controller.spec";
import { IRequest } from "../../api/users/user-controller";
import { HttpResponse } from "../../utils";
import {isProfileOwner} from "../permissions-middleware";

const req = {
  body: {},
  headers: {},
  params: {}
} as IRequest;
let res;

const next = jest.fn();
describe("Permissions Middleware", () => {
  beforeAll(() => {
    jest.spyOn(HttpResponse, "sendResponse");
    res = {
      status: jest.fn(() => ({
        send: jest.fn(),
      })).mockReturnValue({send: jest.fn()}),
    };
  });

  it("should call next if user is profile owner", () => {
    req.params.id = String(1);
    req.user = mockUser;
    isProfileOwner(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should sendResponse in case id param doesn't match", () => {
    req.params.id = String(2);
    req.user = mockUser;
    jest.spyOn(HttpResponse, "sendResponse");
    isProfileOwner(req, res, next);
    expect(HttpResponse.sendResponse).toHaveBeenCalled();
  });
});
