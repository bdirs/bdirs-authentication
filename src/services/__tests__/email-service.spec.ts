import { IEmailOptions } from "../../types/email-type";
import {emailService} from "../email-service";


export const options: IEmailOptions = {
      to: "",
      from: "",
      subject: "",
      html: "",
};

describe("Email Service", () => {
  it("should create transporter", () => {
    const res = emailService.transporter();
    expect(res).toBeDefined();
  });

  it("should send mail", async () => {
    jest.spyOn(emailService, "transporter").mockImplementation();
    await emailService.sendMail(options);
    expect(emailService.transporter).toBeCalled();
  });
});
