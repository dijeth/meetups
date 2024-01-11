<template>
  <ul class="meetup-info">
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
      {{ organizer }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
      {{ place }}
    </li>
    <li>
      <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
      <time :datetime="datetime">{{ humanDate }}</time>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

const props = withDefaults(
  defineProps<{
    date: number;
    organizer?: string;
    place?: string;
  }>(),
  { organizer: '', place: '' },
);

const humanDate = computed(() => {
  return new Date(props.date).toLocaleDateString(navigator.language, { dateStyle: 'medium' });
});

const datetime = computed(() => {
  return dayjs(props.date).format('YYYY-MM-DD');
});
</script>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
