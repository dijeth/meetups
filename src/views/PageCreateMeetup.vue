<template>
  <LayoutMeetupForm title="Создание митапа">
    <MeetupForm
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="router.push({ name: 'index' })"
      :disabled="isLoading"
      ref="meetupFormRef"
    />
  </LayoutMeetupForm>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { useApi, API_NATIVE_RESPONSE } from '../composables/useApi';
import { postMeetupWithImage } from '../services/meetupService';
import type { TMeetup } from 'src/types';
import { useRouter } from 'vue-router';
import { useToaster } from '../plugins/toaster';

const { user } = useAuthStore();
const { request, isLoading } = useApi(postMeetupWithImage, {
  showProgress: true,
  successToast: 'Meetup is successfully created',
  errorToast: API_NATIVE_RESPONSE,
});
const meetup = ref(createMeetup(user!.fullname));
const meetupFormRef = ref<ComponentPublicInstance<typeof MeetupForm>>();
const router = useRouter();
const toaster = useToaster();

const handleSubmit = async (meetup: TMeetup, file?: File) => {
  const result = await request(meetup, file);
  if (result.success) {
    // We passed an image file, but it wasn`t added to the meetup. This means that an error has occurred
    if (file && !result.data.image) {
      toaster.error('The meetup image was not uploaded. Try to add image to the meetup later');
    }

    (meetupFormRef.value!.$refs.formRef as HTMLFormElement).reset();
    router.push({ name: 'meetup', params: { meetupId: result.data.id } });
  }
};
</script>

<style scoped></style>
