import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserService } from '../services/authService';
import { ADMIN_EMAIL } from '../const';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);
  const isAdmin = computed(() => user.value && user.value.email === ADMIN_EMAIL);

  const setUser = (value: User | null) => {
    user.value = value;
  };

  // метод актуализации данных пользователя с API
  const syncUser = async () => {
    setUser(await getUserService());
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    setUser,
    syncUser,
  };
});
