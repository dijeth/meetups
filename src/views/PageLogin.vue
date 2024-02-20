<template>
  <LayoutAuth title="Вход">
    <UiForm @submit.prevent="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" required />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block>Войти</UiButton>
        <UiButton variant="secondary" type="button" @click="loginAsDemoUser" block>Войти, как Demo User</UiButton>
      </template>

      <template #append>
        Нет аккаунта? <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { loginService } from '../services/authService';
import { useToaster } from '../plugins/toaster';
import { useRoute, useRouter } from 'vue-router';
import { DEMO_USER } from '../const';
import { getBackPath } from '../utils/routerUtils';

const email = ref();
const password = ref();

const { setUser } = useAuthStore();
const toaster = useToaster();
const router = useRouter();
const route = useRoute();

const login = async (user: string, password: string) => {
  try {
    setUser(await loginService(user, password));
    toaster.success('Авторизация прошла успешно');
    router.push({ name: getBackPath(route.query) || 'index' });
  } catch (err) {
    toaster.error('Неверные учётные данные...');
  }
};

const handleSubmit = () => {
  login(email.value, password.value);
};

const loginAsDemoUser = () => {
  login(DEMO_USER.email, DEMO_USER.password);
};
</script>

<style scoped></style>
