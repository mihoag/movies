import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthContextType from '../type/auth/auth_context.type';
import { user } from '../type/user/user';
import { apiGetUserByAuthorization } from '../apis/profileApi';
import { setAuthContext } from '../util/authUtils';

// Define types for context

// Create the context with an initial empty object
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component to provide authentication context to its children.
 *
 * @param {object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will consume the context.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // State to manage access token
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // State to manage refresh access token
  const [refreshAccessToken, setRefreshAccessToken] = useState<string | null>(null);

  // State to manage user information
  const [userInfo, setUserInfo] = useState<user | null>(null);

  useEffect(() => {
    setAuthContext({
      isAuthenticated,
      userInfo,
      accessToken,
      refreshAccessToken,
      updateTokens,
      updateAfterLogin,
      updateAfterLogout,
    });
  }, [accessToken, refreshAccessToken]);

  /**
   * Updates the authentication state after a successful login.
   *
   * @param {object} user - The user information.
   * @param {string} token - The JWT token.
   */
  const updateAfterLogin = (user: user, token: string, refreshAccessToken: string) => {
    setIsAuthenticated(true);
    setUserInfo(user);
    setAccessToken(token);
    setRefreshAccessToken(refreshAccessToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshAccessToken);
    localStorage.setItem('username', user.username);
  };

  const updateTokens = (token: string, refreshAccessToken: string) => {
    setAccessToken(token);
    setRefreshAccessToken(refreshAccessToken);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshAccessToken);
  };

  /**
   * Updates the authentication state after a logout.
   */
  const updateAfterLogout = () => {
    setIsAuthenticated(false);
    setUserInfo(null);
    setAccessToken(null);
    setRefreshAccessToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  };

  // Function to verify token and fetch user info
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    console.log(token);
    console.log(refreshToken);

    if (token && refreshToken) {
      const userData = await apiGetUserByAuthorization(token);
      console.log(userData);
      if (userData?.username) {
        //console.log(userData);
        updateAfterLogin(userData, token, refreshToken);
      } else if (!userData) {
        updateAfterLogout();
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userInfo,
        accessToken,
        refreshAccessToken,
        updateTokens,
        updateAfterLogin,
        updateAfterLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
