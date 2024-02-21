<template>
  <div>
    <MeetupCover :title="meetup.title" :image="meetup.image" />

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <slot />
        </div>
        <div class="meetup__aside">
          <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          <div class="meetup__aside-buttons">
            <slot name="action-buttons" />
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>

<script setup lang="ts">
import MeetupCover from './MeetupCover.vue';
import MeetupInfo from './MeetupInfo.vue';
import UiContainer from './UiContainer.vue';
import type { TMeetup } from 'src/types';

defineProps<{ meetup: TMeetup }>();
</script>

<style scoped>
.meetup {
  display: flex;
  flex-direction: column;
  margin: 48px 0 0;
}

.meetup__aside {
  margin: 40px 0;
}

.meetup__aside-buttons {
  margin-top: 30px;
}

.meetup__aside-buttons :deep(.button) {
  margin: 0 10px 10px 0;
}

@media all and (min-width: 992px) {
  .meetup {
    flex-direction: row;
  }

  .meetup__content {
    flex: 1 0 calc(100% - 350px);
  }

  .meetup__aside {
    flex: 1 0 350px;
    padding: 50px 0 0 44px;
    margin: 0;
  }
}
</style>
