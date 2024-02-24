<template>
  <LayoutMeetupForm title="Редактирование митапа">
    <MeetupForm
      v-if="meetup"
      :meetup="meetup"
      submit-text="Сохранить"
      @submit="handleSubmit"
      @cancel="router.push({ name: 'meetup', params: { meetupId: meetup.id.toString() } })"
      :disabled="isLoading"
      ref="meetupFormRef"
    />
    <UiAlert v-else>Загрузка...</UiAlert>
  </LayoutMeetupForm>
</template>

<script setup lang="ts">
import { type ComponentPublicInstance, ref, computed, onActivated } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import LayoutMeetupForm from '../components/LayoutMeetupForm.vue';
import { useApi, API_NATIVE_RESPONSE } from '../composables/useApi';
import { putMeetupWithImage } from '../services/meetupService';
import type { TMeetup } from 'src/types';
import { useRoute, useRouter } from 'vue-router';
import { useToaster } from '../plugins/toaster';
import { getMeetup } from '../api/meetupsApi';
import UiAlert from '../components/UiAlert.vue';

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

const requestedMeetutId = computed<number | null>(() => {
  const { meetupId } = route.params;
  if (!meetupId) {
    return null;
  }
  return Array.isArray(meetupId) ? +meetupId[0] : +meetupId;
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

onActivated(() => {
  if (requestedMeetutId.value !== null) {
    requestMeetup(requestedMeetutId.value);
  }
});
</script>

<style scoped></style>
