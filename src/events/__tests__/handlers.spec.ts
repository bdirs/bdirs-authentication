import * as helpers from "../../helpers";
import {IAdminEmail} from "../../helpers/email-helper";
import { newAdminRegisteredHandler } from "../handlers";

describe("Handlers", () => {
    it("should handle new admin registration event", async () => {
        const data: IAdminEmail = {
            email: "test@test",
            username: "username",
            addedBy: "me",
            password: "password",
        };
        jest.spyOn(helpers, "sendAdminConfirmationEmail").mockResolvedValueOnce(null);
        await newAdminRegisteredHandler(data);
        expect(helpers.sendAdminConfirmationEmail).toBeCalled();
    });
});
