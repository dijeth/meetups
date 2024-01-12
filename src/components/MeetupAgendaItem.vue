<template>
  <div class="agenda-item">
    <div class="agenda-item__col">
      <img :src="icon" class="icon" :alt="iconKey" />
    </div>
    <div class="agenda-item__col">{{ time }}</div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">{{ title }}</h3>
      <p v-if="data.type === 'talk'" class="agenda-item__talk">
        <span>{{ data.speaker }}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang">{{ data.language }}</span>
      </p>
      <p>{{ data.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TAgendaItem } from 'src/types';
import { computed } from 'vue';
import { AgendaItemDefaultTitle, AgendaItemIcon } from '../const';

// TODO: add <UiIcon> component
const props = defineProps<{ data: TAgendaItem }>();
const time = computed(() => `${props.data.startsAt} - ${props.data.endsAt}`);
const icon = computed(() => `/assets/icons/icon-${AgendaItemIcon[props.data.type]}.svg`);
const iconKey = computed(() => AgendaItemIcon[props.data.type]);
const title = computed(() => props.data.title || AgendaItemDefaultTitle[props.data.type]);
</script>

<style scoped>
/* _agenda-item.css */
.agenda-item {
  padding: 24px 0;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.agenda-item__col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.agenda-item__col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.agenda-item__col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.agenda-item__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.agenda-item__lang {
  font-style: italic;
}

.agenda-item__dot::before {
  content: '•';
  color: var(--grey);
  padding: 0 1ch;
}

.agenda-item__talk {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .agenda-item {
    padding: 40px 0;
  }
}
</style>
