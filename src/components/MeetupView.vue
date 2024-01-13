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
import { useAuthStore } from '../stores/useAuthStore';
import { computed } from 'vue';
import { RouterLink, type RouteLocationRaw } from 'vue-router';

const props = defineProps<{ meetup: TMeetup }>();
const { isAuthenticated } = useAuthStore();

type TActionButton = {
  variant: 'primary' | 'secondary' | 'danger';
  title: string;
  key: string;
  tag: 'a' | 'button' | Object;
  to?: RouteLocationRaw;
  onClick?: (...args: any[]) => void;
};

const ActionButton: { [k: string]: TActionButton } = {
  EDIT: {
    variant: 'primary',
    title: 'Редактировать',
    key: 'EDIT',
    tag: RouterLink,
    to: { name: 'edit-meetup', params: { meetupId: props.meetup.id.toString() } },
  },
  DELETE: { variant: 'danger', title: 'Удалить', key: 'DELETE', tag: 'button', onClick: () => {} },
  CANCEL_ATTENDING: {
    variant: 'secondary',
    title: 'Отменить участие',
    key: 'CANCEL_ATTENDING',
    tag: 'button',
    onClick: () => {},
  },
  ATTEND: {
    variant: 'primary',
    title: 'Участвовать',
    key: 'ATTEND',
    tag: 'button',
    onClick: () => {
      console.log('Участвовать');
    },
  },
};

const userButtons = computed<TActionButton[]>(() => {
  if (props.meetup.organizing) {
    return [ActionButton.EDIT, ActionButton.DELETE];
  }

  if (props.meetup.attending) {
    return [ActionButton.CANCEL_ATTENDING];
  }

  if (isAuthenticated) {
    return [ActionButton.ATTEND];
  }

  return [];
});
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
  padding: 0 0 0 34px;
  margin-top: 16px;
}

.meetup__aside-button {
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
