import { emailService } from "../services";
import { EMAIL_USER } from "../config";

export interface IEmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export interface IAdminEmail {
  email: string;
  username: string;
  password: string;
  addedBy: string;
}

export interface IPasswordResetEmail {
  email: string;
  link: string;
}
export const sendAdminConfirmationEmail = async (data: IAdminEmail): Promise<void> => {
  const {email, username, password, addedBy} = data;
  const options: IEmailOptions = {
    from: EMAIL_USER,
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

export const sendPasswordResetEmail = async (data: IPasswordResetEmail): Promise<void> => {
  const{email, link} = data;
  const options: IEmailOptions = {
    from: EMAIL_USER,
    subject: "PASSWORD RESET EMAIL",
    to: email,
    html:
    `
    ${link}
    <p>Hey ${email} you recently requested a password reset to this email</p>
    <p>If so please click the link to reset your password</p>
    <p>If you didnot request a password reset please ignore this email and click here to let us know</p>
    <p>Thank you for being part of the family</p>`,
  };
  await emailService.sendMail(options);
};
