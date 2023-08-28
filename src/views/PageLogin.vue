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
      </template>

      <template #append>
        Нет аккаунта? <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script lang="ts" setup>
// TODO: Task 05-vue-router/01-AuthPages
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
import { useRouter } from 'vue-router';

// TODO: <title> "Вход | Meetups"

const email = ref('');
const password = ref('');

const { setUser } = useAuthStore();
const toaster = useToaster();
const router = useRouter();

const handleSubmit = async () => {
  try {
    setUser(await loginService(email.value, password.value));
    toaster.success('Авторизация прошла успешно');
    //  TODO: Перейти на from (Task 05-vue-router/01-AuthPages)
    router.push({ name: 'index' });
  } catch (err) {
    toaster.error('Неверные учётные данные...');
  }
};
</script>

<style scoped></style>
