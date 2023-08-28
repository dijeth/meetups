<template>
  <nav class="nav">
    <RouterLink v-if="$route.meta.showReturnToMeetups" :to="{ name: 'meetups' }" class="nav__link">
      &larr; Вернуться к списку
    </RouterLink>
    <RouterLink v-for="{ to, title } in links" :to="to" class="nav__link">{{ title }}</RouterLink>
    <a v-if="authStore.isAuthenticated" href="#" class="nav__link" @click.prevent="handleLogout"
      >{{ authStore.user?.fullname }} (выйти)</a
    >
    <!-- Ссылка - не часть проекта -->
    <RouterLink :to="{ name: 'demo' }" class="nav__link">🎨 Components Demo</RouterLink>
  </nav>
</template>

<script lang="ts" setup>
import { logoutService } from '../services/authService';
import { useAuthStore } from '../stores/useAuthStore';
import { useToaster } from '../plugins/toaster';
import { useRouter, type RouteLocationNamedRaw } from 'vue-router';
import { computed } from 'vue';

const authStore = useAuthStore();
const toaster = useToaster();
const router = useRouter();

const links = computed<{ to: RouteLocationNamedRaw; title: string }[]>(() =>
  authStore.isAuthenticated
    ? [
        { to: { name: 'meetups', query: { participation: 'attending' } }, title: 'Мои митапы' },
        { to: { name: 'meetups', query: { participation: 'organizing' } }, title: 'Организуемые митапы' },
        { to: { name: 'create-meetup' }, title: 'Создать митап' },
      ]
    : [
        { to: { name: 'login' }, title: 'Вход' },
        { to: { name: 'register' }, title: 'Регистрация' },
      ],
);

const handleLogout = async () => {
  try {
    await logoutService();
    authStore.setUser(null);
    router.push({ name: 'index' });
  } catch (err) {
    toaster.error('Ошибка при попытке разлогиниться');
  }
};
</script>

<style scoped>
/* _nav.css */
.nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

.nav__link {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

.nav__link + .nav__link {
  margin-top: 8px;
}

.nav__link:hover {
  color: var(--blue);
}

.nav__link:before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  .nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  .nav__link,
  .nav__link + .nav__link {
    margin-top: 0;
  }

  .nav__link:first-child:before {
    display: none;
  }
}
</style>
