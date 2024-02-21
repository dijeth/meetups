<template>
  <UiCalendarView v-slot="{ day, year, month }">
    <UiCalendarEvent
      class="calendar-event"
      v-for="meetup in meetupsMap.get(`${year}${month}${day}`) || []"
      tag="RouterLink"
      :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      :key="meetup.id"
    >
      {{ meetup.title }}
      <div class="calendar-event__badge-list" v-if="meetup.organizing || meetup.attending">
        <UiBadge v-if="meetup.organizing" type="success" title="Организую">О</UiBadge>
        <UiBadge v-if="meetup.attending" type="primary" title="Участвую">У</UiBadge>
      </div>
    </UiCalendarEvent>
  </UiCalendarView>
</template>

<script setup lang="ts">
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';
import { computed } from 'vue';
import UiBadge from './UiBadge.vue';
import type { TMeetup } from 'src/types';

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

<style scoped>
.calendar-event {
  display: flex;
  justify-content: space-between;
}
.calendar-event__badge-list {
  font-size: 10px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
</style>
