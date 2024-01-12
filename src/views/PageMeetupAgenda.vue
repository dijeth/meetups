<template>
  <MeetupAgenda v-if="meetup.agenda.length" :agenda="meetup.agenda" />
  <UiAlert v-else>Программа пока пуста...</UiAlert>
</template>

<script setup lang="ts">
import type { TMeetup } from 'src/types';
import MeetupAgenda from '../components/MeetupAgenda.vue';
import UiAlert from '../components/UiAlert.vue';
defineProps<{ meetup: TMeetup }>();
</script>

<style scoped></style>
