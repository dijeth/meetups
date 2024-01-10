<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { TViewType } from 'src/types';
import { computed, provide } from 'vue';

const props = defineProps<{ modelValue: TViewType }>();
const emits = defineEmits(['update:modelValue']);

provide(
  'activeValue',
  computed(() => props.modelValue),
);
provide('setActiveValue', (value: TViewType) => emits('update:modelValue', value));
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
