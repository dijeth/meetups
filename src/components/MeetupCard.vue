<template>
  <UiCard tag="article" :cover="meetup.image" class="meetup-card">
    <template #header>
      {{ meetup.title }}
    </template>

    <template #default>
      <div class="meetup-card__badge-list">
        <UiBadge v-if="meetup.organizing" type="success" class="meetup-card__badge">Организую</UiBadge>
        <UiBadge v-if="meetup.attending" type="primary" class="meetup-card__badge">Участвую</UiBadge>
      </div>
      <MeetupInfo :date="meetup.date" :place="meetup.place" :organizer="meetup.organizer" />
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import UiBadge from './UiBadge.vue';
import UiCard from './UiCard.vue';
import MeetupInfo from './MeetupInfo.vue';
import type { TMeetup } from 'src/types';

defineProps<{ meetup: TMeetup }>();
</script>

<style scoped>
/* _meetup-card.css */

.meetup-card {
  position: relative;
}

.meetup-card__badge-list {
  position: absolute;
  top: 0;
  right: 0;
}
.meetup-card__badge {
  margin-left: 10px;
}
</style>
