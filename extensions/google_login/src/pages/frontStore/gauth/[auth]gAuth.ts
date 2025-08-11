import { amohajewelleryRequest, amohajewelleryResponse } from "@amohajewellery/amohajewellery";
import { buildUrl } from "@amohajewellery/amohajewellery/lib/router";
import { getConfig } from "@amohajewellery/amohajewellery/lib/util/getConfig";
import { getEnv } from "@amohajewellery/amohajewellery/lib/util/getEnv";
import { getGoogleAuthUrl } from "../../../services/getGoogleAuthUrl.js";

export default (request: amohajewelleryRequest, response: amohajewelleryResponse, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect("/");
    return;
  }
  const client_id = getEnv("GOOGLE_LOGIN_CLIENT_ID");
  const homeUrl = getConfig("shop.homeUrl", "http://localhost:3000");
  const redirect_uri = `${homeUrl}${buildUrl("gcallback")}`;
  const googleAuthUrl = getGoogleAuthUrl(client_id, redirect_uri);
  response.redirect(googleAuthUrl);
};
