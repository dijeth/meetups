import type { TAgendaDict, TAgendaItemType } from './types';

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
export const AgendaItemIcon: TAgendaDict = {
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
