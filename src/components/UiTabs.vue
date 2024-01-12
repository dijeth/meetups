<template>
  <div class="tabs">
    <div class="tabs__nav" role="tablist">
      <slot name="tabs" />
    </div>
    <div class="tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* _tabs.css */
.tabs {
  margin: 0;
}

.tabs__nav {
  display: flex;
  flex-direction: row;
  position: relative;
}

.tabs__nav:before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: var(--grey-2);
}
</style>
