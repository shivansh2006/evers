const staticMiddleware = require('@amohajewellery/amohajewellery/src/lib/middlewares/static');

module.exports = (request, response, delegate, next) => {
  staticMiddleware(request, response, next);
};
