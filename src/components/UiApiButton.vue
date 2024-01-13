<template>
  <UiButton :tag="tag" :variant="variant" :block="block" @click="request">
    <slot />
  </UiButton>
</template>

<script setup lang="ts">
import { useApi, type TApiFunction } from '../composables/useApi';
import { type UiButtonProps } from './UiButton.vue';
import UiButton from './UiButton.vue';
import { watch, watchEffect } from 'vue';

const props = defineProps<UiButtonProps & { apiFunction: TApiFunction<void> }>();
const emit = defineEmits(['success', 'error', 'loading']);
const { request, result, isLoading } = useApi(props.apiFunction);

watch(isLoading, () => {
  emit('loading', isLoading.value);
});

watchEffect(() => {
  if (!result.value) {
    return;
  }

  if (result.value.success) {
    emit('success');
  } else {
    emit('error');
  }
});
</script>

<style scoped></style>
