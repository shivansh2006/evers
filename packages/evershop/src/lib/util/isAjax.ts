import type { amohajewelleryRequest } from 'types/request'

export function isAjax(request: amohajewelleryRequest) {
  return request.get('X-Requested-With') === 'XMLHttpRequest';
}
