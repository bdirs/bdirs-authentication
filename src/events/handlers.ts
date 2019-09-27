import { sendAdminConfirmationEmail } from "../helpers";
import {IAdminEmail} from "../helpers/email-helper";

/**
 * @param  {any} data
 * @returns {Promise}
 */
export const newAdminRegisteredHandler = async (data: IAdminEmail): Promise<any> => {
  await sendAdminConfirmationEmail(data);
};
