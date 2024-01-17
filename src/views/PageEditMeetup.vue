<template>
  <LayoutMeetupForm title="Создание митапа">
    <MeetupForm
      v-if="meetup"
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="router.push({ name: 'meetup', params: { meetupId: meetup.id.toString() } })"
      :disabled="isLoading"
      ref="meetupFormRef"
    />
  </LayoutMeetupForm>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, ref, watch, computed } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useApi, API_NATIVE_RESPONSE } from '../composables/useApi';
import { putMeetupWithImage } from '../services/meetupService';
import type { TMeetup } from 'src/types';
import { useRoute, useRouter } from 'vue-router';
import { useToaster } from '../plugins/toaster';
import { getMeetup } from '../api/meetupsApi';

// TODO: <title> "Редактирование митапа | Meetups"

const { request, isLoading } = useApi(putMeetupWithImage, {
  showProgress: true,
  successToast: 'Meetup is successfully updated',
  errorToast: API_NATIVE_RESPONSE,
});

const {
  request: requestMeetup,
  isLoading: isMeetupLoading,
  result: meetupResult,
} = useApi<TMeetup>(getMeetup, { errorToast: API_NATIVE_RESPONSE, showProgress: true });

const meetup = computed(() => {
  if (!meetupResult.value) {
    return;
  }

  return meetupResult.value.success ? meetupResult.value.data : undefined;
});

const meetupFormRef = ref<ComponentPublicInstance<typeof MeetupForm>>();
const router = useRouter();
const route = useRoute();
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

watch(
  () => route.params.meetupId,
  (value) => {
    const meetupId = Array.isArray(value) ? +value[0] : +value;
    requestMeetup(meetupId);
  },
  { immediate: true },
);
</script>

<style scoped></style>
