<template>
  <component
    :is="tag"
    class="button"
    :class="{ [`button_${variant}`]: true, button_block: block }"
    :type="tag === 'button' ? 'button' : undefined"
  >
    <slot />
  </component>
</template>

<script lang="ts">
export type UiButtonProps = {
  tag?: string | Component;
  variant?: 'primary' | 'secondary' | 'danger';
  block?: boolean;
};
</script>

<script lang="ts" setup>
import type { Component } from 'vue';
withDefaults(defineProps<UiButtonProps>(), { tag: 'button', variant: 'secondary', block: false });
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition-duration: 0.2s;
  transition-property: background-color, border-color, color;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button:disabled {
  color: var(--white);
  background-color: var(--grey);
  border-color: var(--grey);
}

.button.button_block {
  display: block;
  width: 100%;
}

.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}

.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}

.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
