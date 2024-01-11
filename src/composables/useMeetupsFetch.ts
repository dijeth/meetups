import { onMounted, ref } from 'vue';
import { getMeetups } from '../api/meetupsApi.js';
import type { TMeetup } from 'src/types.js';

export function useMeetupsFetch() {
  const meetups = ref<TMeetup[]>([]);

  onMounted(async () => {
    meetups.value = (await getMeetups()).data;
  });

  return {
    meetups,
  };
}
