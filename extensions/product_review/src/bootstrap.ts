import { defaultPaginationFilters } from "@amohajewellery/amohajewellery/lib/util/defaultPaginationFilters";
import { addProcessor } from "@amohajewellery/amohajewellery/lib/util/registry";
import registerDefaultReviewCollectionFilters from "./services/registerDefaultReviewCollectionFilters.js";
import { GraphQLFilter } from "@amohajewellery/amohajewellery";

export default () => {
  // Reigtering the default filters for attribute collection
  addProcessor(
    "productReviewCollectionFilters",
    registerDefaultReviewCollectionFilters,
    1
  );
  addProcessor(
    "productReviewCollectionFilters",
    (filters) => [...(filters as GraphQLFilter[]), ...defaultPaginationFilters],
    2
  );
};
