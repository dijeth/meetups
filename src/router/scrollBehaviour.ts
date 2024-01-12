import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouterScrollBehavior } from 'vue-router';

export const scrollBehavior = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  savedPosition: any,
) => {
  if (to.hash) {
    return {
      el: to.hash,
    };
  }

  if (from.meta?.saveScrollPosition && to.meta?.saveScrollPosition) {
    return false;
  }

  if (savedPosition) {
    return savedPosition;
  }

  return { left: 0, top: 0 };
};
