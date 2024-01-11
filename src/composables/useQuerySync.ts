import { watch, ref, toValue, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const toLastItem = <T = any>(itemOrArray: T | T[]): T =>
  Array.isArray(itemOrArray) ? itemOrArray.reverse()[0] : itemOrArray;

export const useQuerySync = (key: string, defaultValue: string): Ref<string> => {
  const queryParameter = ref(defaultValue);
  const route = useRoute();

  watch(
    () => toValue(route.query),
    (query) => {
      queryParameter.value = toLastItem(query[key]) || defaultValue;
    },
    { immediate: true },
  );

  watch(queryParameter, async (value) => {
    const query = new URLSearchParams(document.location.search);

    if (value === defaultValue) {
      query.delete(key);
    } else {
      query.set(key, value);
    }

    const queryString = query.toString();
    const fullPath = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    window.history.replaceState(null, '', fullPath);
  });

  return queryParameter;
};
