import { useAuth } from '../context/auth-context';
import { showError } from '../util/ErrorToastifyRender';
import { Navigate } from 'react-router-dom';

interface RouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: RouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    showError('You must be logged in to access this page');
    return <Navigate to="/tmdb-frontend/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
