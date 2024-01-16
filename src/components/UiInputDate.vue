<template>
  <UiInput v-model="value" :type="type" :step="stepValue" ref="inputRef">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script lang="ts">
const DateKind = {
  DATE: 'date',
  TIME: 'time',
  DATETIME_LOCAL: 'datetime-local',
} as const;
</script>

<script setup lang="ts">
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { computed, ref, type ComponentPublicInstance } from 'vue';
import UiInput from './UiInput.vue';

dayjs.extend(utc);

const props = withDefaults(
  defineProps<{
    modelValue: number;
    type?: (typeof DateKind)[keyof typeof DateKind];
    step?: number;
  }>(),
  { type: DateKind.DATE, step: 1 },
);

const emit = defineEmits(['update:modelValue']);

const inputRef = ref<ComponentPublicInstance<typeof UiInput>>();

const value = computed({
  get(): string {
    if (!props.modelValue) {
      return '';
    }

    switch (props.type) {
      case DateKind.TIME:
        return dayjs(props.modelValue).utc().format('HH:mm');

      case DateKind.DATETIME_LOCAL:
        return dayjs(props.modelValue).utc().format('YYYY-MM-DDTHH:mm:ss');

      default:
      case DateKind.DATE:
        return dayjs(props.modelValue).utc().format('YYYY-MM-DD');
    }
  },

  set() {
    emit('update:modelValue', (inputRef.value?.$refs.inputRef as HTMLInputElement).valueAsNumber);
  },
});

const stepValue = computed((): number => {
  const step = Math.max(props.step, 1);
  return props.type === DateKind.TIME ? 60 * step : step;
});
</script>
