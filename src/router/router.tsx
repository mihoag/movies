import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { HomePage } from '../page/home';
import { LoginPage, RegistrationPage } from '../page/auth';
import { ProfilePage } from '../page/profile';

import { DetailMoviePage } from '../page/movie/detail-movie';
import MainLayout from '../layout/main-layout';
import { NotFoundPage } from '../page/error';
import ProtectedRoute from './private-route';
import RedirectIfAuthenticated from './redirect-if-authenticated-route';
import SearchPage from '../page/search/search-page';
import Authenticate from '../page/auth/authenticate-page';
import { ListCreatorPage, ListEditorPage } from '../page/list';
import { DetailPerson } from '../page/person';
import { ForgotPasswordPage, ResetPasswordPage, ResendEmailPage, SendOtpPage } from '../page/auth';
import SendOtpActiveAccountPage from '../page/auth/send-otp-active-page';
import ServerErrorPage from '../page/error/server-error-page';

// Define the router with typed routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/tmdb-frontend" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      {/* Auth routes */}
      <Route
        path="login"
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="forgot-password"
        element={
          <RedirectIfAuthenticated>
            <ForgotPasswordPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="send-otp/:email"
        element={
          <RedirectIfAuthenticated>
            <SendOtpPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="send-otp-verify-account/:email"
        element={
          <RedirectIfAuthenticated>
            <SendOtpActiveAccountPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="reset-password/:token"
        element={
          <RedirectIfAuthenticated>
            <ResetPasswordPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="register"
        element={
          <RedirectIfAuthenticated>
            <RegistrationPage />
          </RedirectIfAuthenticated>
        }
      />
      <Route
        path="resend-email-verification"
        element={
          <RedirectIfAuthenticated>
            <ResendEmailPage />
          </RedirectIfAuthenticated>
        }
      />

      {/* Profile route */}
      <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
      <Route
        path="authenticate"
        element={
          <RedirectIfAuthenticated>
            <Authenticate />
          </RedirectIfAuthenticated>
        }
      />

      <Route path="list/new" element={<ListCreatorPage />} />
      <Route path="list/:id/edit" element={<ListEditorPage />} />
      <Route path="movie/:id" element={<DetailMoviePage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="person/:id" element={<DetailPerson />} />
      <Route path="not-found" element={<NotFoundPage />} />
      <Route path="server-error" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export default router;
