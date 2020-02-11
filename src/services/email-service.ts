import * as nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USER } from "../config";
import { IEmailOptions } from "../helpers/email-helper";

export default class EmailService {
  constructor(
    private readonly service?: string,
    ) { }

  public transporter(): nodemailer.Transporter {
    return nodemailer.createTransport(
      {
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
        service: this.service || "gmail",
      },
    );
  }

  public async sendMail(mailOptions: IEmailOptions): Promise<any> {
    try {
      const info = await this.transporter().sendMail(mailOptions);
      return info;
    } catch (e) {
      const message = e.message || "Couldn't send the mail";
      return message;
    }

  }

}

const emailService = new EmailService(null);
export { emailService };
