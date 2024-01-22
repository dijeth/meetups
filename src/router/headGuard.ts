import { setDocumentTitle } from '../utils/domUtils';
import type { RouteLocationNormalized } from 'vue-router';

export function headerGuard(to: RouteLocationNormalized) {
  setDocumentTitle(to.meta.header as string);
  return true;
}
