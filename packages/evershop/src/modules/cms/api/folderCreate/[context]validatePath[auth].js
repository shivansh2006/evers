import { INVALID_PAYLOAD } from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';
import { CONSTANTS } from '@amohajewellery/amohajewellery/src/lib/helpers.js';
import { validatePath } from '../../services/validatePath.js';

export default (request, response, delegate, next) => {
  const { path } = request.body || '';
  // Validate the path to avoid Relative Path Traversal attack
  if (validatePath(CONSTANTS.MEDIAPATH, path) === false) {
    response.status(INVALID_PAYLOAD).json({
      error: {
        status: INVALID_PAYLOAD,
        message: 'Invalid path'
      }
    });
  } else {
    next();
  }
};
