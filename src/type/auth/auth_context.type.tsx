import { user } from '../user/user';
export default interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: user | null;
  accessToken: string | null;
  refreshAccessToken: string | null;
  updateTokens: (token: string, refreshAccessToken: string) => void;
  updateAfterLogin: (user: user, token: string, refreshAccessToken: string) => void;
  updateAfterLogout: () => void;
}
