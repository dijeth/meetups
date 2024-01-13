<template>
  <div class="page-meetup">
    <MeetupView v-if="result && result.success" :meetup="result.data">
      <UiTabs>
        <template #tabs>
          <UiTab :to="{ name: 'meetup.description' }">Описание</UiTab>
          <UiTab :to="{ name: 'meetup.agenda' }">Программа</UiTab>
        </template>
        <template #default>
          <RouterView :meetup="result.data" />
        </template>
      </UiTabs>
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
import { ref, watch } from 'vue';
import MeetupView from '../components/MeetupView.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiTabs from '../components/UiTabs.vue';
import UiTab from '../components/UiTab.vue';
import { getMeetup } from '../api/meetupsApi.js';
import { useApi } from '../composables/useApi';
import type { TMeetup } from 'src/types';

// TODO: Установить <title> - "<название митапа> | Meetups"

const props = defineProps<{ meetupId: number }>();

const { isLoading, request, result } = useApi<TMeetup>(getMeetup);

// const fetchMeetup = async () => {
//   meetup.value = null;
//   error.value = null;

//   const result = await getMeetup(props.meetupId);
//   if (result.success) {
//     meetup.value = result.data;
//   } else {
//     error.value = result.error.message;
//   }
// };

watch(
  () => props.meetupId,
  () => request(props.meetupId),
  { immediate: true },
);
</script>

<style scoped></style>
