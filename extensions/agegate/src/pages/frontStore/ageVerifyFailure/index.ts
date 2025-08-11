import { amohajewelleryRequest } from '@amohajewellery/amohajewellery';
import { setContextValue } from '@amohajewellery/amohajewellery/graphql/services';

export default (request: amohajewelleryRequest) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age verification failed',
    description: 'Age verification failed'
  });
};
