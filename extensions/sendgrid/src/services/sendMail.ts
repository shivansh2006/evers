import { debug, error } from "@amohajewellery/amohajewellery/lib/log";
import { getConfig } from "@amohajewellery/amohajewellery/lib/util/getConfig";
import { getEnv } from "@amohajewellery/amohajewellery/lib/util/getEnv";
import sgMail from "@sendgrid/mail";

export const sendMail = async function sendMail(data) {
  try {
    const apiKey = getEnv("SENDGRID_API_KEY", "");
    const from = getConfig("sendgrid.from", "");

    if (!apiKey || !from) {
      debug("No SendGrid API key or from address found");
      return;
    }
    sgMail.setApiKey(apiKey);
    await sgMail.send({ ...data, from });
  } catch (e) {
    error(e);
    throw e;
  }
};
