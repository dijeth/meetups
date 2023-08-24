import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { getUserService } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

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
    setUser,
    syncUser,
  };
});
