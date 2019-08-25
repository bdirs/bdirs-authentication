import * as dotenv from "dotenv";
import {userService} from "../../services";
import StartUpHelper from "../startup.loader";
dotenv.config();

describe("StartUpHelper", () => {
  const testEnv = process.env;
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
    process.env = {...testEnv};
  });
  it("should create super admin on start up",  async () => {
    jest.spyOn(userService, "findOrCreate").mockResolvedValueOnce({});
    await StartUpHelper.createAdmin();
    expect(userService.findOrCreate).toBeCalled();
  });

  it("should not create admin if SUPER_ADMIN_EMAIL doesnot exist", async () => {
    process.env.SUPER_ADMIN_EMAIL = undefined;
    jest.spyOn(userService, "findOrCreate").mockResolvedValueOnce({});
    jest.spyOn(StartUpHelper, "createAdmin").mockResolvedValue();
    await StartUpHelper.createAdmin();
    expect(userService.findOrCreate).not.toBeCalled();
  });

});
