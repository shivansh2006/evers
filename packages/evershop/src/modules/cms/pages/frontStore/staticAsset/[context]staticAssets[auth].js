import staticMiddleware from '@amohajewellery/amohajewellery/src/lib/middlewares/static.js';

export default (request, response, delegate, next) => {
  staticMiddleware(request, response, next);
};
