import { setContextValue } from '@amohajewellery/amohajewellery/graphql/services';

export default (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age Setting',
    description: 'Age Setting'
  });
};
