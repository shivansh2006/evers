import type { amohajewelleryRequest } from '../../types/request.js';

export function isAjax(request: amohajewelleryRequest) {
  return request.get('X-Requested-With') === 'XMLHttpRequest';
}
