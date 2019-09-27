import * as events from "..";
import app from "../../app";

describe("Events", () => {
    it("should register events", () => {
        jest.spyOn(app, "on");
        events.registerEvents();
        expect(app.on).toBeCalled();
    });

    it("should broadcast events", () => {
        jest.spyOn(app, "emit");
        events.broadcastEvent("eventName");
        expect(app.emit).toBeCalled();
    });
})
