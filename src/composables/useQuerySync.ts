import type { LocationQuery, LocationQueryValue } from 'vue-router';
import {
  DATE_DEFAULT,
  PARTICIPATION_DEFAULT,
  VIEW_DEFAULT,
  type TDateType,
  type TParticipationType,
  type TViewType,
  DateType,
  ParticipationType,
  ViewType,
  QueryKey,
} from '../types';
import { ref, type MaybeRefOrGetter, toValue, watch, watchEffect } from 'vue';

const toLastItem = <T = any>(itemOrArray: T | T[]): T =>
  Array.isArray(itemOrArray) ? itemOrArray.reverse()[0] : itemOrArray;

const normalizeQueryParam = <T extends { [s: string]: string }>(
  param: LocationQueryValue | LocationQueryValue[],
  dict: T,
  defaultValue: T[keyof T],
): T[keyof T] => {
  if (!param) {
    return defaultValue;
  }

  const paramValue = toLastItem(param);
  return paramValue && Object.values(dict).includes(paramValue) ? (param as T[keyof T]) : defaultValue;
};

const updateQuery = (key: string, value: string, defaultValue: string) => {
  const query = new URLSearchParams(document.location.search);

  if (value === defaultValue) {
    query.delete(key);
  } else {
    query.set(key, value);
  }

  console.log(`updating ${key}, ${value}`);

  window.history.replaceState(null, '', `${window.location.pathname}?${query.toString()}`);
};

export const useQuerySync = (query: MaybeRefOrGetter<LocationQuery>) => {
  const dateParam = ref<TDateType>(DATE_DEFAULT);
  const participationParam = ref<TParticipationType>(PARTICIPATION_DEFAULT);
  const viewParam = ref<TViewType>(VIEW_DEFAULT);
  const searchParam = ref<string>('');

  watch(
    () => toValue(query),
    ({ date, participation, view, search }) => {
      dateParam.value = normalizeQueryParam(date, DateType, DATE_DEFAULT);
      participationParam.value = normalizeQueryParam(participation, ParticipationType, PARTICIPATION_DEFAULT);
      viewParam.value = normalizeQueryParam(view, ViewType, VIEW_DEFAULT);
      searchParam.value = toLastItem(search) || '';
    },
    { immediate: true },
  );

  watch(dateParam, (value): void => {
    updateQuery(QueryKey.DATE, value, DATE_DEFAULT);
  });

  watch(participationParam, (value): void => {
    updateQuery(QueryKey.PARTICIPATION, value, PARTICIPATION_DEFAULT);
  });

  watch(viewParam, (value): void => {
    updateQuery(QueryKey.VIEW, value, VIEW_DEFAULT);
  });

  watch(searchParam, (value): void => {
    updateQuery(QueryKey.SEARCH, value, '');
  });

  return { dateParam, viewParam, participationParam, searchParam };
};
