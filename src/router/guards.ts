import type { RouteLocation, RouteLocationNormalized } from 'vue-router';
import { isUserLogged } from '../services/authService';
import { setDocumentTitle } from '../utils/domUtils';

export const authGuard = (to: RouteLocationNormalized) => {
  if (!to.meta.auth) {
    return true;
  }

  if (!isUserLogged()) {
    return { name: 'login' };
  }

  return true;
};

export const headerGuard = (to: RouteLocationNormalized) => {
  setDocumentTitle(to.meta.header as string);
  return true;
};

export const pathSaverGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized): boolean | RouteLocation => {
  if (to.name !== 'login') {
    return true;
  }

  const { name } = from;
  const fromName = (name === 'register' ? null : name) || 'index';

  return to.query && to.query.from ? true : ({ ...to, query: { ...to.query, from: fromName } } as RouteLocation);
};
