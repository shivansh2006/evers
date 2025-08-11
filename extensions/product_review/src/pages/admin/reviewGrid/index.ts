import { setContextValue } from "@amohajewellery/amohajewellery/graphql/services";
import { buildFilterFromUrl } from "@amohajewellery/amohajewellery/lib/util/buildFilterFromUrl";

export default (request, response) => {
  setContextValue(request, "pageInfo", {
    title: "Reviews",
    description: "Reviews",
  });
  setContextValue(request, "filtersFromUrl", buildFilterFromUrl(request));
};
