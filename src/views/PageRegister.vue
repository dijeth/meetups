<template>
  <LayoutAuth title="Регистрация">
    <UiForm @submit.prevent="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required />
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" />
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{ name: 'login' }">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiCheckbox from '../components/UiCheckbox.vue';
import UiLink from '../components/UiLink.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '../components/LayoutAuth.vue';
import { useToaster } from '../plugins/toaster';
import { registerService } from '../services/authService';
import { useRouter } from 'vue-router';

const email = ref('');
const fullname = ref('');
const password = ref('');
const password2 = ref('');
const agree = ref(false);

const toaster = useToaster();
const router = useRouter();

const validate = () => {
  if (password.value !== password2.value) {
    return 'Пароли не совпадают';
  }
  if (!agree.value) {
    return 'Требуется согласится с условиями';
  }
};

const handleSubmit = async () => {
  const validationError = validate();
  if (validationError) {
    toaster.error(validationError);
    return;
  }
  try {
    await registerService(fullname.value, email.value, password.value);
    toaster.success('Регистрация выполнена успешно');
    router.push({ name: 'login' });
  } catch (err) {
    toaster.error(`Ошибка регистрации пользователя "${err}"`);
  }
};
</script>

<style scoped></style>
