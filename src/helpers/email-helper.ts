import {emailService} from "../services";
import {IEmailOptions} from "../types";


export interface IAdminEmail {
  email: string;
  username: string;
  password: string;
  addedBy: string;
}
export const sendAdminConfirmationEmail = async (data: IAdminEmail): Promise<void> => {
  const {email, username, password, addedBy} = data;
  const options: IEmailOptions = {
    from: "aggrey256@gmail.com",
    subject: "ADMIN REGISTRATION EMAIL",
    to: email,
    html:
      `
      <p>Hey ${username} Your have been added to the BIDRS system by ${addedBy}.
      We have attached your login details at the bottom of this message
      Please keep this credentials secure and also don't share them with anyone
      Once logged in you can change your password </p>
      <p><strong>Username</strong>: ${username}</p>
      <p><strong>Email</strong>: ${email}</p>
      <p><strong>Password</strong>: ${password}</p>
      Thank You;
    `,
  };
  await emailService.sendMail(options);
};
