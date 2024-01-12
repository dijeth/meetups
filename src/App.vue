<template>
  <LayoutBase>
    <RouterView v-if="isLoaded">
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3" exclude="PageMeetup">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <!-- <template #fallback>
      </template> -->
    </RouterView>
    <UiAlert v-else>Загрузка...</UiAlert>
  </LayoutBase>
</template>

<script lang="ts" setup>
import LayoutBase from './components/LayoutBase.vue';
import { onNetworkError, onUnauthenticated } from './api/httpClient/httpClient';
import { useAuthStore } from './stores/useAuthStore';
import { onMounted, ref } from 'vue';
import { useToaster } from './plugins/toaster';
import { useRouter } from 'vue-router';

const { syncUser, setUser } = useAuthStore();
const isLoaded = ref<boolean>(false);
const toaster = useToaster();
const router = useRouter();

// Установить <title> - "Meetups"
document.title = 'Meetups';

onUnauthenticated(async () => {
  // сессия пользователя больше не валидна - нужна обработка потери авторизации
  toaster.error('User session is outdated.');
  router.push({ name: 'index', replace: true });
});

onNetworkError(() => {
  // проблема с сетью, стоит вывести тост пользователю
  toaster.error('Network error. Try reloading the page later.');
});

onMounted(async () => {
  // для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности
  await syncUser();
  isLoaded.value = true;
});

// обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
// глобальные ошибки можно поймать событиями "error" и "unhandledrejection"
const globalErrorHandler = (event: PromiseRejectionEvent | ErrorEvent) => {
  console.log(event);
  toaster.error('Global error.');
};
window.addEventListener('error', globalErrorHandler);
window.addEventListener('unhandledrejection', globalErrorHandler);
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
