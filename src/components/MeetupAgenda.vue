<template>
  <ul class="agenda">
    <li class="agenda__item" v-for="item in agenda" :key="item.id">
      <MeetupAgendaItem :data="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { TAgendaItem } from 'src/types';
import MeetupAgendaItem from './MeetupAgendaItem.vue';
defineProps<{ agenda: TAgendaItem[] }>();
</script>

<style scoped>
/* _agenda.css */
.agenda {
  margin: 0;
  padding: 0;
  list-style: none;
}

.agenda__item {
  border-top: 1px solid var(--grey-3);
}

.agenda__item:first-child {
  border-top: none;
}
</style>
