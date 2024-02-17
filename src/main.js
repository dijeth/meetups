import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { createToaster } from './plugins/toaster';
import { createProgress } from './plugins/progress';

createApp(App).use(router).use(createPinia()).use(createToaster()).use(createProgress()).mount('#app');
