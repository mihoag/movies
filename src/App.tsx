import { RouterProvider } from 'react-router-dom'; // Importing RouterProvider component from react-router-dom
import router from './router/router'; // Importing the router configuration
import { AuthProvider } from './context/auth-context'; // Importing the AuthProvider component from the auth-context

const App: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
