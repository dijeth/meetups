<template>
  <UiCalendarView v-slot="{ day, year, month }">
    <UiCalendarEvent
      v-for="meetup in meetupsMap.get(`${year}${month}${day}`) || []"
      tag="a"
      :href="`/meetups/${meetup.id}`"
      :key="meetup"
    >
      {{ meetup.title }}
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script setup lang="ts">
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';
import { computed } from 'vue';

type TMeetup = {
  id: number;
  date: number;
  title: string;
  __dateForDebug: string;
};

const props = defineProps<{ meetups: TMeetup[] }>();
const meetupsMap = computed((): Map<string, TMeetup[]> => {
  return props.meetups.reduce((acc, cur) => {
    const date = new Date(cur.date);
    const key = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;

    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(cur);

    return acc;
  }, new Map());
});
</script>

<style scoped></style>
