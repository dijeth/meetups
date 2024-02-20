import UiDropdown from './components/UiDropdown.vue';
import type { TIconType } from './components/UiIcon.vue';
import UiInput from './components/UiInput.vue';
import type { TAgendaDict, TAgendaItemType, TFormSchema } from './types';

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
export const AgendaItemDefaultTitle: TAgendaDict = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
export const AgendaItemIcon: { [k in TAgendaItemType]: TIconType } = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const AGENDA_ITEM_OPTIONS = (Object.entries(AgendaItemDefaultTitle) as [TAgendaItemType, string][]).map(
  ([type, title]) => ({
    value: type,
    text: title,
    icon: AgendaItemIcon[type],
  }),
);

export const TALK_LANGUAGE_OPTIONS = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export const commonAgendaItemFormSchema: TFormSchema = {
  title: {
    label: 'Нестандартный текст (необязательно)',
    component: UiInput,
    props: {},
  },
};

export const FormSchema: Record<TAgendaItemType, TFormSchema> = {
  registration: commonAgendaItemFormSchema,
  opening: commonAgendaItemFormSchema,
  break: commonAgendaItemFormSchema,
  coffee: commonAgendaItemFormSchema,
  closing: commonAgendaItemFormSchema,
  afterparty: commonAgendaItemFormSchema,
  talk: {
    title: {
      label: 'Тема',
      component: UiInput,
      props: {},
    },
    speaker: {
      label: 'Докладчик',
      component: UiInput,
      props: {},
    },
    description: {
      label: 'Описание',
      component: UiInput,
      props: {
        multiline: true,
      },
    },
    language: {
      label: 'Язык',
      component: UiDropdown,
      props: {
        options: TALK_LANGUAGE_OPTIONS,
        title: 'Язык',
      },
    },
  },
  other: {
    title: {
      label: 'Заголовок',
      component: UiInput,
      props: {},
    },
    description: {
      label: 'Описание',
      component: UiInput,
      props: {
        multiline: true,
      },
    },
  },
};

export const ADMIN_EMAIL = 'admin@email.com';
export const DEMO_USER = {
  email: 'demo@email',
  password: '111111',
};
