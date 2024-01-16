<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="emit('remove')">
      <UiIcon icon="trash" />
    </button>

    <UiFormGroup>
      <UiDropdown title="Тип" :options="AGENDA_ITEM_OPTIONS" name="type" v-model="localData.type" />
    </UiFormGroup>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <UiFormGroup label="Начало">
          <UiInput type="time" placeholder="00:00" name="startsAt" v-model="localData.startsAt" />
        </UiFormGroup>
      </div>
      <div class="agenda-item-form__col">
        <UiFormGroup label="Окончание">
          <UiInput type="time" placeholder="00:00" name="endsAt" v-model="localData.endsAt" />
        </UiFormGroup>
      </div>
    </div>

    <UiFormGroup v-for="(schema, name) in formSchema" :label="schema.label" :key="name">
      <component
        :is="schema.component"
        :name="name"
        v-bind="schema.props"
        v-model="localData[name as keyof TAgendaItem]"
      />
    </UiFormGroup>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';
import type { TAgendaItem, TFormSchema } from '../types';
import { AGENDA_ITEM_OPTIONS, FormSchema } from '../const';
import { klona } from 'klona';
import UiIcon from './UiIcon.vue';

const timeToMs = (time: string): number => {
  const [h, m] = time.split(':');
  return 1000 * 60 * parseInt(m) + 1000 * 60 * 60 * parseInt(h);
};

const msToTime = (ms: number): string => new Date(ms).toISOString().split('T')[1].slice(0, 5);

const props = defineProps<{ agendaItem: TAgendaItem }>();
const emit = defineEmits(['remove', 'update:agendaItem']);
const localData = ref<TAgendaItem>(klona(props.agendaItem));

const formSchema = computed((): TFormSchema => {
  return FormSchema[localData.value.type];
});

watch(
  () => localData.value.startsAt,
  (newValue: string, oldValue: string) => {
    localData.value.endsAt = msToTime(timeToMs(localData.value.endsAt) + timeToMs(newValue) - timeToMs(oldValue));
  },
);

watch(
  localData,
  (newValue: TAgendaItem) => {
    emit('update:agendaItem', newValue);
  },
  { deep: true },
);
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
