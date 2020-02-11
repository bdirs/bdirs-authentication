import * as dotenv from "dotenv";
import * as events from "../../events";
import StartUpHelper from "../startup.loader";

dotenv.config();

describe("StartUpHelper", () => {
  it("should loadEvents", () => {
    jest.spyOn(events, "registerEvents");
    StartUpHelper.loadEvents();
    expect(events.registerEvents).toBeCalled();
  });
});
