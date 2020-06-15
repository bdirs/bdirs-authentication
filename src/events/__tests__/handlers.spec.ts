import * as helpers from "../../helpers";
import {IAdminEmail} from "../../helpers/email-helper";
import { newAdminRegisteredHandler } from "../handlers";

jest.mock("../../helpers/email-helper.ts", () => ({
    sendAdminConfirmationEmail: jest.fn(),
}));

describe("Handlers", () => {
    it("should handle new admin registration event", async () => {
        const data: IAdminEmail = {
            addedBy: "me",
            email: "test@test",
            password: "password",
            username: "username",
        };
        jest.spyOn(helpers, "sendAdminConfirmationEmail").mockResolvedValueOnce(null);
        await newAdminRegisteredHandler(data);
        expect(helpers.sendAdminConfirmationEmail).toBeCalled();
    });
});
