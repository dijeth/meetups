<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';

const props = defineProps<{ modelValue: string }>();
const emits = defineEmits(['update:modelValue']);

provide(
  'activeValue',
  computed(() => props.modelValue),
);
provide('setActiveValue', (value: string) => emits('update:modelValue', value));
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
}
</style>
