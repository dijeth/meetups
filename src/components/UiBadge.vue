<template>
  <span class="badge" :class="badgeClass"><slot /></span>
</template>

<script>
const badgeClasses = {
  primary: 'badge_primary',
  success: 'badge_success',
};

export default {
  name: 'UiBadge',

  props: {
    type: {
      type: String,
      required: false,
      validator: (value) => Object.keys(badgeClasses).includes(value),
    },
  },

  computed: {
    badgeClass() {
      return badgeClasses[this.type];
    },
  },
};
</script>

<style scoped>
/* _badge.css */
.badge {
  font-size: 1em;
  line-height: 1em;
  text-align: right;
  display: inline-block;
  padding: 0.5em;
}

.badge_primary {
  color: var(--blue);
  background-color: var(--blue-extra);
}

.badge_success {
  color: var(--green);
  background-color: var(--green-light);
}
</style>
