<template>
  <LayoutBase>
    <RouterView v-if="isLoaded">
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
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

const { syncUser } = useAuthStore();
const isLoaded = ref<boolean>(false);

// TODO: Установить <title> - "Meetups"

onUnauthenticated(() => {
  // TODO: сессия пользователя больше не валидна - нужна обработка потери авторизации
});

onNetworkError(() => {
  // TODO: проблема с сетью, стоит вывести тост пользователю
});

// TODO: обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
// TODO: глобальные ошибки можно поймать событиями "error" и "unhandledrejection"

onMounted(async () => {
  // для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности
  await syncUser();
  isLoaded.value = true;
});
</script>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
