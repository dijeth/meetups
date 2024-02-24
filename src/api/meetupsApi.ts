import { httpClient } from './httpClient/httpClient.js';
import type { TMeetup } from 'src/types.js';
import type { ResultContainer } from './httpClient/ResultContainer.js';

/**
 * Получить список всех митапов
 */
export const getMeetups = async (): Promise<ResultContainer<TMeetup[]>> => {
  return httpClient.get('/meetups');
};

/**
 * Получить митап по ID
 */
export const getMeetup = async (id: number): Promise<ResultContainer<TMeetup>> => {
  return httpClient.get(`/meetups/${id}`);
};

/**
 * Создать митап
 */
export const postMeetup = async (meetup: TMeetup): Promise<ResultContainer<TMeetup>> => {
  return httpClient.post('/meetups/', meetup);
};

/**
 * Обновить митап
 */
export const putMeetup = (meetup: TMeetup): Promise<ResultContainer<TMeetup>> => {
  return httpClient.put(`/meetups/${meetup.id}`, meetup);
};

/**
 * Удалить митап
 */
export const deleteMeetup = (id: number): Promise<ResultContainer<void>> => {
  return httpClient.delete(`/meetups/${id}`);
};

/**
 * Добавить текущего пользователя в участники митапа
 */
export const attendMeetup = async (id: number): Promise<ResultContainer<void>> => {
  return httpClient.post(`/meetups/${id}/participation`);
};

/**
 * Удалить текущего пользователя из участников
 */
export const leaveMeetup = async (id: number): Promise<ResultContainer<void>> => {
  return httpClient.delete(`/meetups/${id}/participation`);
};
