/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/useAuthStore';
import { createToaster } from './plugins/toaster';

// TODO: установить плагины: head(title), progress
createApp(App).use(router).use(createPinia()).use(createToaster()).mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
