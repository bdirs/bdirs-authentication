import { emailService } from "../../services"
import { IAdminEmail, sendAdminConfirmationEmail } from "../email-helper";


jest.setTimeout(6000);
describe("email-helper", () => {
    it("should send email to super admin", async(done) => {
        jest.spyOn(emailService, "sendMail");
        const emailInfo: IAdminEmail = {
            addedBy: "dee",
            password: "password",
            username: "username",
            email: "email"
        }
        await sendAdminConfirmationEmail(emailInfo);
        expect(emailService.sendMail).toBeCalled();
        done()
    })
})