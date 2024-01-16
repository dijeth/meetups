import { createErrorResult } from './httpClient/ResultContainer';
import { httpClient } from './httpClient/httpClient.js';

// TODO: remove manual test mocks

/**
 * Получить список всех митапов
 * @returns {Promise<ResultContainer<Meetup[]>>}
 */
export async function getMeetups() {
  // await new Promise((res) => setTimeout(res, 3000));
  return httpClient.get('/meetups');
}

/**
 * Получить митап по ID
 * @param {number} id
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export async function getMeetup(id) {
  // await new Promise((res) => setTimeout(res, 3000));
  return httpClient.get(`/meetups/${id}`);
}

/**
 * Создать митап
 * @param {Object} meetup
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export async function postMeetup(meetup) {
  // await new Promise((res) => setTimeout(res, 3000));
  return httpClient.post('/meetups/', meetup);
}

/**
 * Обновить митап
 * @param {Object} meetup
 * @returns {Promise<ResultContainer<Meetup>>}
 */
export function putMeetup(meetup) {
  // TODO: реализовать функцию
}

/**
 * Удалить митап
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export function deleteMeetup(id) {
  return httpClient.delete(`/meetups/${id}`);
}

/**
 * Добавить текущего пользователя в участники митапа
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export async function attendMeetup(id) {
  await new Promise((res) => setTimeout(res, 3000));
  // return createErrorResult({ message: 'Uuups' }, {});
  return httpClient.post(`/meetups/${id}/participation`);
}

/**
 * Удалить текущего пользователя из участников
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export async function leaveMeetup(id) {
  await new Promise((res) => setTimeout(res, 3000));
  return httpClient.delete(`/meetups/${id}/participation`);
}
