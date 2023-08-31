<template>
  <div class="button-group" role="group">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, provide } from 'vue';

type TListType = 'list' | 'calendar';

const props = defineProps<{ modelValue: TListType }>();
const emits = defineEmits(['update:modelValue']);

provide(
  'activeValue',
  computed(() => props.modelValue),
);
provide('setActiveValue', (value: TListType) => emits('update:modelValue', value));
</script>

<style scoped>
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
