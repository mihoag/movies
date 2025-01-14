export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
};

export const getAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
};
