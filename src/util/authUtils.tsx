import AuthContextType from '../type/auth/auth_context.type';

let authContext: AuthContextType | null = null;

export const setAuthContext = (context: AuthContextType) => {
  authContext = context;
};

export const getAccessToken = () => {
  return authContext?.accessToken || '';
};

export const updateAfterLogout = () => {
  authContext?.updateAfterLogout();
};
