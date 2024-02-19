<template>
  <img class="icon" :alt="icon" :src="iconSrc" />
</template>

<script lang="ts">
export const IconType = {
  ALERT_CIRCLE: 'alert-circle',
  CAL_SM: 'cal-sm',
  CAL_LG: 'cal-lg',
  CHECK: 'check',
  CHECK_CIRCLE: 'check-circle',
  CHEVRON_DOWN: 'chevron-down',
  CLOCK: 'clock',
  COFFEE: 'coffee',
  KEY: 'key',
  LIST: 'list',
  MAP: 'map',
  PEN_TOOL: 'pen-tool',
  PILL_ACTIVE: 'pill-active',
  SEARCH: 'search',
  TRASH: 'trash',
  TV: 'tv',
  USER: 'user',
} as const;

export type TIconType = (typeof IconType)[keyof typeof IconType];
</script>

<script setup lang="ts">
import AlertCircle from '../assets/icons/icon-alert-circle.svg';
import CalSm from '../assets/icons/icon-cal-sm.svg';
import CalLg from '../assets/icons/icon-cal-lg.svg';
import Check from '../assets/icons/icon-check.svg';
import CheckCircle from '../assets/icons/icon-check-circle.svg';
import ChevronDown from '../assets/icons/icon-chevron-down.svg';
import Clock from '../assets/icons/icon-clock.svg';
import Coffee from '../assets/icons/icon-coffee.svg';
import Key from '../assets/icons/icon-key.svg';
import List from '../assets/icons/icon-list.svg';
import Map from '../assets/icons/icon-map.svg';
import PenTool from '../assets/icons/icon-pen-tool.svg';
import PillActive from '../assets/icons/icon-pill-active.svg';
import Search from '../assets/icons/icon-search.svg';
import Trash from '../assets/icons/icon-trash.svg';
import Tv from '../assets/icons/icon-tv.svg';
import User from '../assets/icons/icon-user.svg';
import { ref, watchEffect } from 'vue';

const IconSvg: { [k in TIconType]: string } = {
  ['alert-circle']: AlertCircle,
  ['cal-sm']: CalSm,
  ['cal-lg']: CalLg,
  ['check']: Check,
  ['check-circle']: CheckCircle,
  ['chevron-down']: ChevronDown,
  ['clock']: Clock,
  ['coffee']: Coffee,
  ['key']: Key,
  ['list']: List,
  ['map']: Map,
  ['pen-tool']: PenTool,
  ['pill-active']: PillActive,
  ['search']: Search,
  ['trash']: Trash,
  ['tv']: Tv,
  ['user']: User,
};

const props = defineProps<{ icon: TIconType }>();
const iconSrc = ref<string>(IconSvg[props.icon]);

watchEffect(() => {
  iconSrc.value = IconSvg[props.icon];
});
</script>

<style scoped>
/* _icon.css */
.icon {
  display: block;
}
</style>
