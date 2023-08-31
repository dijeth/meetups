import { isUserLogged } from '../services/authService';
import type { RouteLocationNormalized } from 'vue-router';

export function authGuard(to: RouteLocationNormalized) {
  if (!to.meta.auth) {
    return true;
  }

  if (!isUserLogged()) {
    return { name: 'login' };
  }

  return true;
}
