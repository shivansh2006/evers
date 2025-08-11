import { error } from "@amohajewellery/amohajewellery/lib/log";
import { pool } from "@amohajewellery/amohajewellery/lib/postgres";
import { getConfig } from "@amohajewellery/amohajewellery/lib/util/getConfig";
import { getEnv } from "@amohajewellery/amohajewellery/lib/util/getEnv";
import { getValue } from "@amohajewellery/amohajewellery/lib/util/registry";
import { select } from "@amohajewellery/postgres-query-builder";
import sgMail from "@sendgrid/mail";

export default async function sendOrderConfirmationEmail(data) {
  try {
    // Check if the API key is set
    const apiKey = getEnv("SENDGRID_API_KEY", "");
    const from = getConfig("sendgrid.from", "");

    if (!apiKey || !from) {
      return;
    }
    sgMail.setApiKey(apiKey);
    const customerRegistered = getConfig(
      "sendgrid.events.customer_registered",
      {
        enabled: true,
        subject: "Welcome to amohajewellery",
        templateId: undefined, // This is the SendGrid template ID
      }
    );

    // Check if the we need to send the email on order placed event
    if (customerRegistered.enabled === false) {
      return;
    }

    // Check if the template is set
    if (!customerRegistered.templateId) {
      return;
    }

    // Build the email data
    const customerId = data.customer_id;
    const customer = await select()
      .from("customer")
      .where("customer_id", "=", customerId)
      .load(pool);

    if (!customer) {
      return;
    }

    // Remove the password
    delete customer.password;

    const emailDataFinal = await getValue<typeof customer>(
      "sendgrid_customer_welcome_email_data",
      customer,
      {}
    );
    // Send the email
    const msg = {
      to: emailDataFinal.email,
      subject: customerRegistered.subject || `Welcome to amohajewellery`,
      from,
      templateId: customerRegistered.templateId,
      dynamicTemplateData: {
        ...emailDataFinal,
        home_url: getConfig("shop.homeUrl", ""),
      },
    };

    await sgMail.send(msg);
  } catch (e) {
    error(e);
  }
}
