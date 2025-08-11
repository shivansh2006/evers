import { amohajewelleryRequest } from '@amohajewellery/amohajewellery';
import { setContextValue } from '@amohajewellery/amohajewellery/graphql/services';

export default (request: amohajewelleryRequest) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age Gate - Please verify your age to continue visiting this site',
    description: 'Age Gate - Please verify your age to continue'
  });
};
