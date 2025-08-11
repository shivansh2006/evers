const { setContextValue } = require("@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper");

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Age Setting',
    description: 'Age Setting'
  });
};
