<template>
  <UiContainer>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <UiRadioGroup v-model="date" :options="dateFilterOptions" name="date" />
      </div>

      <div class="filters-panel__col">
        <UiFormGroup inline>
          <UiInput v-model.trim="search" rounded small placeholder="Поиск" type="search">
            <template #left-icon>
              <UiIcon icon="search" />
            </template>
          </UiInput>
        </UiFormGroup>
        <UiFormGroup inline>
          <UiButtonGroup v-model="view">
            <UiButtonGroupItem value="list">
              <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="m5 7c-.55228 0-1 .44772-1 1s.44772 1 1 1h.01c.55228 0 1-.44772 1-1s-.44772-1-1-1zm5 0c-.55228 0-1 .44772-1 1s.44772 1 1 1h13c.5523 0 1-.44772 1-1s-.4477-1-1-1zm0 6c-.55228 0-1 .4477-1 1s.44772 1 1 1h13c.5523 0 1-.4477 1-1s-.4477-1-1-1zm-1 7c0-.5523.44772-1 1-1h13c.5523 0 1 .4477 1 1s-.4477 1-1 1h-13c-.55228 0-1-.4477-1-1zm-5-6c0-.5523.44772-1 1-1h.01c.55228 0 1 .4477 1 1s-.44772 1-1 1h-.01c-.55228 0-1-.4477-1-1zm1 5c-.55228 0-1 .4477-1 1s.44772 1 1 1h.01c.55228 0 1-.4477 1-1s-.44772-1-1-1z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </UiButtonGroupItem>
            <UiButtonGroupItem value="calendar">
              <svg height="22" viewBox="0 0 20 22" width="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  clip-rule="evenodd"
                  d="m15 1c0-.552285-.4477-1-1-1s-1 .447715-1 1v1h-6v-1c0-.552285-.44772-1-1-1s-1 .447715-1 1v1h-2c-1.65685 0-3 1.34315-3 3v14c0 1.6569 1.34315 3 3 3h14c1.6569 0 3-1.3431 3-3v-14c0-1.65685-1.3431-3-3-3h-2zm3 7v-3c0-.55228-.4477-1-1-1h-2v1c0 .55228-.4477 1-1 1s-1-.44772-1-1v-1h-6v1c0 .55228-.44772 1-1 1s-1-.44772-1-1v-1h-2c-.55228 0-1 .44772-1 1v3zm-16 2h16v9c0 .5523-.4477 1-1 1h-14c-.55228 0-1-.4477-1-1z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </UiButtonGroupItem>
          </UiButtonGroup>
        </UiFormGroup>
      </div>
    </div>

    <UiAlert v-if="isLoading">Загрузка...</UiAlert>
    <template v-else>
      <KeepAlive v-if="filteredMeetups.length">
        <component :is="viewComponent" :meetups="filteredMeetups" />
      </KeepAlive>
      <UiAlert v-else>Митапов по заданным условиям не найдено...</UiAlert>
    </template>
  </UiContainer>
</template>

<script setup lang="ts">
import { computed, onActivated, onMounted, watch } from 'vue';
import MeetupsCalendar from '../components/MeetupsCalendar.vue';
import UiRadioGroup from '../components/UiRadioGroup.vue';
import UiButtonGroup from '../components/UiButtonGroup.vue';
import UiContainer from '../components/UiContainer.vue';
import UiAlert from '../components/UiAlert.vue';
import UiIcon from '../components/UiIcon.vue';
import UiButtonGroupItem from '../components/UiButtonGroupItem.vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiInput from '../components/UiInput.vue';
import UiTransitionGroupFade from '../components/UiTransitionGroupFade.vue';
import { useQuerySync } from '../composables/useQuerySync';
import type { TMeetup } from '../types';
import MeetupsList from '../components/MeetupsList.vue';
import { useApi } from '../composables/useApi';
import { getMeetups } from '../api/meetupsApi';
import { useAuthStore } from '../stores/useAuthStore';

const dateFilterOptions = [
  { text: 'Все', value: 'all' },
  { text: 'Прошедшие', value: 'past' },
  { text: 'Ожидаемые', value: 'future' },
];

const dateFilter = (meetup: TMeetup) =>
  date.value === 'all' ||
  (date.value === 'past' && new Date(meetup.date) <= new Date()) ||
  (date.value === 'future' && new Date(meetup.date) > new Date());

const participationFilter = (meetup: TMeetup) =>
  participation.value === 'all' ||
  (participation.value === 'organizing' && meetup.organizing) ||
  (participation.value === 'attending' && meetup.attending);

const searchFilter = (meetup: TMeetup) =>
  [meetup.title, meetup.description, meetup.place, meetup.organizer]
    .join(' ')
    .toLowerCase()
    .includes(search.value.toLowerCase());

const { request, result, isLoading } = useApi<TMeetup[]>(getMeetups, { showProgress: true });
const meetups = computed(() => (result.value && result.value.success ? result.value.data : []));
const view = useQuerySync('view', 'list');
const search = useQuerySync('search', '');
const date = useQuerySync('date', 'all');
const participation = useQuerySync('participation', 'all');
const authStore = useAuthStore();
const viewComponent = computed(() => (view.value === 'list' ? MeetupsList : MeetupsCalendar));
const filteredMeetups = computed(() =>
  meetups.value.filter((meetup: TMeetup) => dateFilter(meetup) && participationFilter(meetup) && searchFilter(meetup)),
);

watch(() => authStore.isAuthenticated, request);
onActivated(() => request());
</script>

<style scoped>
.filters-panel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 32px 0;
}

.filters-panel__col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

@media all and (max-width: 767px) {
  .filters-panel {
    flex-direction: column;
  }

  .filters-panel__col + .filters-panel__col {
    margin-top: 16px;
  }
}
</style>
