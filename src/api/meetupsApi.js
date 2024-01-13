import { httpClient } from './httpClient/httpClient.js';

/**
 * Получить список всех митапов
 * @returns {Promise<ResultContainer<Meetup[]>>}
 */
export function getMeetups() {
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
export function postMeetup(meetup) {
  // TODO: реализовать функцию
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
  // await new Promise((res) => setTimeout(res, 3000));
  return httpClient.post(`/meetups/${id}/participation`);
}

/**
 * Удалить текущего пользователя из участников
 * @param {number} id
 * @returns {Promise<ResultContainer<void>>}
 */
export function leaveMeetup(id) {
  return httpClient.delete(`/meetups/${id}/participation`);
}
