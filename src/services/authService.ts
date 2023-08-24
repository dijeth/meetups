// Реализовать функции, необходимые для авторизации, помимо работы с API
// Например, сохранения данных пользователя в LS, восстановления и удаления

import { getUser, loginUser, logoutUser, registerUser } from '../api/authApi';
import type { ResultContainer } from '../api/httpClient/ResultContainer';

const LS_KEY = 'logged';

const setLogged = () => {
  localStorage.setItem(LS_KEY, 'true');
};

const setUnlogged = () => {
  localStorage.setItem(LS_KEY, 'false');
};

const isLogged = () => localStorage.getItem(LS_KEY) === 'true';

const sendRequest = async <T>(apiRequest: () => Promise<ResultContainer<T>>): Promise<T | null> => {
  const response = await apiRequest();
  return response.error ? null : response.data;
};

export const getUserService = async (): Promise<User | null> => {
  if (!isLogged()) {
    return null;
  }

  const response = await sendRequest<User>(getUser);
  if (!response) {
    setUnlogged();
  }
  return response;
};

export const loginService = async (email: string, password: string): Promise<User | null> => {
  const response = await sendRequest<User>(() => loginUser(email, password));
  if (response) {
    setLogged();
  }
  return response;
};

export const registerService = async (fullname: string, email: string, password: string): Promise<User | null> => {
  return sendRequest<User>(() => registerUser(fullname, email, password));
};

export const logoutService = async (): Promise<void | null> => {
  const response = await sendRequest<void>(logoutUser);
  if (response) {
    setUnlogged();
  }
  return response;
};
