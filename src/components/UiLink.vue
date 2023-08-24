<template>
  <component :is="tag"><slot /></component>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ tag?: string | object }>(), { tag: 'router-link' });
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
