const staticMiddleware = require('@amohajewellery/amohajewellery/src/lib/middlewares/static');

module.exports = (request, response, stack, next) => {
  staticMiddleware(request, response, next);
};
