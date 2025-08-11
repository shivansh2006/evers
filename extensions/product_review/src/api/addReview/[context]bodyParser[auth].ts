import { amohajewelleryRequest, amohajewelleryResponse } from "@amohajewellery/amohajewellery";
import bodyParser from "body-parser";

export default (
  request: amohajewelleryRequest,
  response: amohajewelleryResponse,
  next: () => void
) => {
  bodyParser.json({ inflate: false })(request, response, next);
};
