import type { TImageDto } from 'src/types';
import type { ResultContainer } from './httpClient/ResultContainer.js';
import { httpClient } from './httpClient/httpClient.js';

/**
 * Загрузить изображение
 * @param {File} file - HTML File с изображением
 * @returns {Promise<ResultContainer<TImageDto>>}
 */
export function postImage(file: File): Promise<ResultContainer<TImageDto>> {
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
