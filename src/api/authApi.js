import { httpClient } from './httpClient/httpClient.js';

/**
 * Получить текущего пользователя
 * @returns {Promise<ResultContainer<User>>}
 */
export function getUser() {
  return httpClient.get('/auth/user');
}

/**
 * Авторизоваться по email и паролю
 * @param {string} email
 * @param {string} password
 * @returns {Promise<ResultContainer<User>>}
 */
export function loginUser(email, password) {
  return httpClient.post('/auth/login', { email, password });
}

/**
 * Зарегистрировать пользователя
 * @param {String} fullname
 * @param {String} email
 * @param {String} password
 * @returns {Promise<ResultContainer<User>>}
 */
export function registerUser(fullname, email, password) {
  return httpClient.post('/auth/register', { fullname, email, password });
}

/**
 * Разлогинить пользователя сессии
 * @returns {Promise<ResultContainer<void>>}
 */
export function logoutUser() {
  return httpClient.post('/auth/logout');
}
