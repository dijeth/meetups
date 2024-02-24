<template>
  <div class="page-meetup">
    <MeetupView v-if="result && result.success" :meetup="result.data">
      <template #default>
        <UiTabs>
          <template #tabs>
            <UiTab :to="{ name: 'meetup.description' }">Описание</UiTab>
            <UiTab :to="{ name: 'meetup.agenda' }">Программа</UiTab>
          </template>
          <template #default>
            <RouterView :meetup="result.data" />
          </template>
        </UiTabs>
      </template>
      <template #action-buttons>
        <UiButton
          v-if="actionButtons.includes('edit')"
          :tag="RouterLink"
          :to="{ name: 'edit-meetup', param: { meetupId: result.data.id } }"
          :block="true"
          variant="secondary"
          :disabled="disabled"
          >Редактировать</UiButton
        >
        <UiApiButton
          v-if="actionButtons.includes('delete')"
          variant="danger"
          :block="true"
          :api-function="() => deleteMeetup(result!.data!.id)"
          success-message="Митап удален"
          :error-message="API_NATIVE_RESPONSE"
          :disabled="disabled"
          @loading="loadingHandler"
          @success="deleteSuccessHandler"
          >Удалить</UiApiButton
        >
        <UiApiButton
          v-if="actionButtons.includes('attend')"
          variant="primary"
          :block="true"
          :api-function="() => attendMeetup(result!.data!.id)"
          success-message="Сохранено"
          :error-message="API_NATIVE_RESPONSE"
          :disabled="disabled"
          @loading="loadingHandler"
          @success="successHandler"
          >Участвовать</UiApiButton
        >
        <UiApiButton
          v-if="actionButtons.includes('leave')"
          variant="secondary"
          :block="true"
          :api-function="() => leaveMeetup(result!.data!.id)"
          success-message="Сохранено"
          :error-message="API_NATIVE_RESPONSE"
          :disabled="disabled"
          @loading="loadingHandler"
          @success="successHandler"
          >Отменить участие</UiApiButton
        >
      </template>
    </MeetupView>

    <UiContainer v-if="result && result.error">
      <UiAlert>{{ result.error.message }}</UiAlert>
    </UiContainer>

    <UiContainer v-if="isLoading">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref, watch, watchEffect } from 'vue';
import MeetupView from '../components/MeetupView.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiTabs from '../components/UiTabs.vue';
import UiTab from '../components/UiTab.vue';
import { attendMeetup, getMeetup, leaveMeetup, deleteMeetup } from '../api/meetupsApi.js';
import { API_NATIVE_RESPONSE, useApi } from '../composables/useApi';
import type { TMeetup } from 'src/types';
import UiApiButton from '../components/UiApiButton.vue';
import UiButton from '../components/UiButton.vue';
import { useAuthStore } from '../stores/useAuthStore';
import { RouterLink, useRouter } from 'vue-router';
import { setDocumentTitle } from '../utils/domUtils';

const props = defineProps<{ meetupId: number }>();

const { isLoading, request, result } = useApi<TMeetup>(getMeetup);
const { isAuthenticated } = useAuthStore();
const router = useRouter();
const disabled = ref<boolean>(true);

const loadingHandler = (isLoading: boolean) => {
  if (isLoading) {
    disabled.value = true;
  }
};

const successHandler = () => {
  return request(props.meetupId);
};
const deleteSuccessHandler = () => {
  router.push({ name: 'index' });
};

const meetup = computed(() => result.value?.data);

const actionButtons = computed(() => {
  const meetup = unref(result.value?.data);
  if (!meetup /* || meetup.date < Date.now() */) {
    return [];
  }

  if (meetup.organizing) {
    return ['edit', 'delete'];
  }

  if (meetup.attending) {
    return ['leave'];
  }

  if (isAuthenticated) {
    return ['attend'];
  }

  return [];
});

watch(
  () => props.meetupId,
  () => {
    request(props.meetupId);
  },
  { immediate: true },
);

watchEffect(() => {
  disabled.value = !result.value?.success;
});

watchEffect(() => {
  setDocumentTitle(meetup.value?.title || '');
});
</script>

<style scoped></style>
