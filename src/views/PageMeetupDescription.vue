<template>
  <MeetupDescription :description="meetup.description" />
</template>

<script setup lang="ts">
import MeetupDescription from '../components/MeetupDescription.vue';
import type { TMeetup } from 'src/types';
defineProps<{ meetup: TMeetup }>();
</script>

<style scoped></style>
