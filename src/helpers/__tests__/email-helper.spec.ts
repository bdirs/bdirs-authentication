import { emailService } from "../../services";
import {IAdminEmail, sendAdminConfirmationEmail, sendPasswordResetEmail} from "../email-helper";

jest.setTimeout(6000);
describe("email-helper", () => {
    it("should send email to super admin", async (done) => {
        jest.spyOn(emailService, "sendMail").mockResolvedValue({});
        const emailInfo: IAdminEmail = {
            addedBy: "dee",
            password: "password",
            username: "username",
            email: "email",
        };
        await sendAdminConfirmationEmail(emailInfo);
        expect(emailService.sendMail).toBeCalled();
        done();
    });

    it("should send password reset email", async () => {
      jest.spyOn(emailService, "sendMail").mockResolvedValue({});
      await sendPasswordResetEmail({email: "email@test.com", link: "link"});
      expect(emailService.sendMail).toHaveBeenCalled();
    });
});
