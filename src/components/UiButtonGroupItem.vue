<template>
  <button
    class="button-group__button"
    :class="{ 'button-group__button_active': value === activeValue }"
    type="button"
    aria-selected="false"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import type { TListType } from './UiButtonGroup.vue';

const props = defineProps<{ value: TListType }>();
const activeValue = inject('activeValue');
const setActiveValue = inject<(value: TListType) => void>('setActiveValue');
const handleClick = () => {
  setActiveValue && setActiveValue(props.value);
};
</script>

<style scoped>
.button-group__button {
  background-color: var(--white);
  border: 2px solid var(--blue);
  border-left: none;
  height: 44px;
  padding: 0 8px;
  color: var(--blue);
  font-weight: 400;
  font-size: 20px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition-duration: 0.3s;
  transition-property: background-color, fill;
  box-shadow: none;
  outline: none;
  cursor: pointer;
}

.button-group__button:first-child {
  border-radius: 22px 0 0 22px;
  border-left: 2px solid var(--blue);
  padding-left: 10px;
  padding-right: 6px;
}

.button-group__button:last-child {
  border-radius: 0 22px 22px 0;
  padding-right: 10px;
}

.button-group__button:hover,
.button-group__button_active {
  background-color: var(--blue);
  color: var(--white);
}

.button-group__button :slotted(svg) {
  fill: var(--blue);
}

.button-group__button:hover :slotted(svg),
.button-group__button_active :slotted(svg) {
  fill: var(--white);
}
</style>
