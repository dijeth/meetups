import { createRouter, createWebHistory } from 'vue-router';
import { scrollBehavior } from './scrollBehaviour';
import { authGuard } from './authGuard';
import { headerGuard } from './headGuard';

/** @type {import('vue-router').RouteRecordRaw[]} */
export const routes = [
  // Only for demo
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo/PageDemo.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/PageMeetups.vue'),
  },
  {
    path: '/meetups',
    name: 'meetups',
    redirect: { name: 'index' },
  },
  {
    path: '/meetups/create',
    name: 'create-meetup',
    component: () => import('../views/PageCreateMeetup.vue'),
    meta: { auth: true, header: 'Создание митапа' },
  },
  {
    path: '/meetups/:meetupId(\\d+)/edit',
    name: 'edit-meetup',
    component: () => import('../views/PageEditMeetup.vue'),
    meta: { auth: true, header: 'Редактирование митапа' },
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    redirect: (to) => ({ name: 'meetup.description', params: to.params }),
    component: () => import('../views/PageMeetup.vue'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup.description',
        component: () => import('../views/PageMeetupDescription.vue'),
      },
      {
        path: 'agenda',
        name: 'meetup.agenda',
        component: () => import('../views/PageMeetupAgenda.vue'),
      },
    ],
  },
  {
    path: '/login',
    meta: { auth: false, header: 'Вход' },
    name: 'login',
    component: () => import('../views/PageLogin.vue'),
  },
  {
    path: '/register',
    meta: { auth: false, header: 'Регистрация' },
    name: 'register',
    component: () => import('../views/PageRegister.vue'),
  },
  {
    path: '/:unknownPath(.*)',
    component: () => import('../views/PageNotFound.vue'),
    meta: { header: 'Страница не найдена' },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach(authGuard);
router.afterEach(headerGuard);
