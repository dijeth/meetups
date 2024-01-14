import type { ResultContainer } from 'src/api/httpClient/ResultContainer';
import { useProgress, type TProgress } from '../plugins/progress';
import { ref, type Ref } from 'vue';
import { useToaster } from '../plugins/toaster';

export type TApiFunction<T> = (...args: any[]) => Promise<ResultContainer<T>>;
export type TApiReturn<T> = {
  isLoading: Ref<boolean>;
  result: Ref<ResultContainer<T> | undefined>;
  request: TApiFunction<T>;
};
export const API_NATIVE_ERROR = 'API_NATIVE_ERROR';

/**
 * Компосабл для выполнения запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром и тостером для отображения результата
 * Возвращает реактивные переменные с результатом
 *
 * @template T
 *
 * @param {IApiFunction<T>} apiFunc - функция, выполняющая запрос к API, и возвращающая промис с
 * @param {object} options
 * @param {boolean=false} [options.showProgress] - показывать ли прогресс загрузки через Progress плагин
 * @param {boolean|string=false} [options.successToast] - В случае успешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @param {boolean|string=false} [options.errorToast] - В случае неуспешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @return {IUseApiReturn<T, typeof apiFunc>}
 */
export function useApi<T>(
  apiFunction: TApiFunction<T>,
  { showProgress = false, successToast = '', errorToast = '' } = {},
): TApiReturn<T> {
  // TODO: add integration for toast and progress
  const result = ref<ResultContainer<T>>();
  const isLoading = ref<boolean>(false);
  const progress = useProgress();
  const progressId = Date.now().toString();
  const toaster = useToaster();

  const startProgress = () => {
    if (progress && showProgress) {
      progress.start(progressId);
    }
  };
  const finishProgress = () => {
    if (progress && showProgress) {
      progress.finish(progressId);
    }
  };
  const failProgress = () => {
    if (progress && showProgress) {
      progress.fail();
    }
  };
  const showSuccessToast = () => {
    if (toaster && successToast) {
      toaster.success(successToast);
    }
  };
  const showErrorToast = (nativeError: string) => {
    if (toaster && errorToast) {
      toaster.error(errorToast === API_NATIVE_ERROR ? nativeError : errorToast);
    }
  };

  const request = async (...args: any[]) => {
    isLoading.value = true;
    result.value = undefined;
    startProgress();
    result.value = await apiFunction(...args);
    if (result.value.success) {
      finishProgress();
      showSuccessToast();
    } else {
      failProgress();
      showErrorToast(result.value.error.message);
    }
    isLoading.value = false;

    return result.value;
  };

  return {
    request,
    result,
    isLoading,
  };
}
