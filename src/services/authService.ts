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

export const isUserLogged = () => localStorage.getItem(LS_KEY) === 'true';

const sendApiRequest = async <T = any>(
  apiRequest: () => Promise<ResultContainer<T>>,
  onError?: (error: Error) => void,
): Promise<T | null> => {
  const response = await apiRequest();
  if (response.error) {
    if (onError) {
      onError(new Error(response.error.message));
    }
    return null;
  }

  return response.data;
};

export const getUserService = async (): Promise<User | null> => {
  return isUserLogged() ? sendApiRequest(getUser, setUnlogged) : null;
};

export const loginService = async (email: string, password: string): Promise<User> => {
  const user = await sendApiRequest(
    () => loginUser(email, password),
    (err) => {
      setUnlogged();
      throw err;
    },
  );

  setLogged();
  return user;
};

export const registerService = (fullname: string, email: string, password: string): Promise<User | null> => {
  return sendApiRequest(() => registerUser(fullname, email, password));
};

export const logoutService = async (): Promise<void> => {
  await sendApiRequest(logoutUser);
  setUnlogged();
};
