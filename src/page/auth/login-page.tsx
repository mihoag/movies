import React, { useState, useReducer } from 'react';
import { Button, TextField } from '@mui/material';
import logo_google from '../../assets/logo_google.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../../components/shared/spinner';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputAdornment from '@mui/material/InputAdornment';
import { showSuccess } from '../../util/SuccessToastifyRender';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../context/auth-context';
import { AlertBox } from '../../components/page/auth/error-alert';
import { InfoAlert } from '../../components/page/auth/info-alert';
import { SignInDto } from '../../type/auth/SignInDto';
import { SignInResponseDto } from '../../type/auth/SignInResponseDto';
import { login } from '../../apis/authApi';

const LOGIN_SUCCESS_MESSAGE = 'Login successfully!';
// Define the LoginPage component
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isUsernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isResendEmail = location.state?.isResendEmail;
  const titleResendEmail = location.state?.titleResendEmail;
  const isNotVeriable = location.state?.isNotVeriable;
  const isEmailVerification = location.state?.isEmailVerification;

  // Auth context
  const { updateAfterLogin } = useAuth();

  // Initial form data
  const initialData: SignInDto = {
    username: '',
    password: '',
  };

  // Reducer function for form data
  function formReducer(state: SignInDto, action: { name: string; value: string }): SignInDto {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  const handleClick = (): void => {
    const callbackUrl = import.meta.env.VITE_REDIRECT_URI as string;
    const authUrl = import.meta.env.VITE_AUTH_URI as string;
    const googleClientId = import.meta.env.VITE_CLIENT_ID as string;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl,
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };
  // Reducer hook for form data
  const [formData, dispatch] = useReducer(formReducer, initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch({ name, value });
  };

  // Reset error messages
  const resetPasswordErrorMessage = () => {
    setPasswordError(false);
    setPasswordErrorMessage('');
  };

  const resetUsernameErrorMessage = () => {
    setUsernameError(false);
    setUsernameErrorMessage('');
  };

  const resetAllErrorMessage = () => {
    resetPasswordErrorMessage();
    resetUsernameErrorMessage();
  };

  // Validate form data
  const validateFormData = (formData: SignInDto): boolean => {
    let isValid = true;

    if (!formData.username || formData.username.trim() === '') {
      setUsernameError(true);
      setUsernameErrorMessage('Username is required');
      isValid = false;
    } else {
      resetUsernameErrorMessage();
    }

    if (!formData.password || formData.password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long');
      isValid = false;
    } else {
      resetPasswordErrorMessage();
    }

    return isValid;
  };

  // Submit handler
  const handleSubmit = async () => {
    setDisabled(true);
    if (validateFormData(formData)) {
      try {
        const data: SignInResponseDto | undefined = await login(formData);
        if (data?.accessToken) {
          console.log(data);
          resetAllErrorMessage();
          showSuccess(LOGIN_SUCCESS_MESSAGE);
          updateAfterLogin(data.user, data.accessToken, data.refreshToken);
          navigate('/tmdb-frontend');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
    setDisabled(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {isResendEmail && (
        <InfoAlert header={titleResendEmail}>
          <p className="text-[20px] leading-[1.2] mb-2">
            We have sent to this email address if it belongs to a registered account on TMDB.
          </p>
          <p className="text-[20px] leading-[1.2]">Make sure to check both your inbox and spam folder!</p>
        </InfoAlert>
      )}

      {isEmailVerification && (
        <InfoAlert header={'Email verification'}>
          <p className="text-[20px] leading-[1.2] mb-2">
            Your email address has been verified. You can now login to your account.
          </p>
        </InfoAlert>
      )}

      <div className="max-w-[1200px] mx-auto py-2 mt-4 mb-20 px-4 font-sans">
        <h1 className="text-[1.5em] font-semibold text-black mb-5 leading-[1.1]">Login to your account</h1>

        <p className="mb-2 text-[14px] leading-[1.5]">
          In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you will
          need to login to your account. If you do not have an account, registering for an account is free and simple.{' '}
          <Link to="/tmdb-frontend/register" className="text-blue-500">
            Click here
          </Link>{' '}
          to get started.
        </p>
        <p className="mb-5 text-[14px] leading-[1.5]">
          If you signed up but didn't get your verification email,{' '}
          <Link to="/tmdb-frontend/resend-email-verification" className="text-blue-500">
            click here
          </Link>{' '}
          to have it resent.
        </p>

        {isNotVeriable && (
          <AlertBox header="Account verification required">
            Your email address hasn't been verified. Please click the verification link in the email that was sent to
            the address you signed up with. (Don't forget to check your spam folder.) You may{' '}
            <a href="/tmdb-frontend/resend-email-verification" className="text-[#DC004E] hover:underline">
              request the email be resent
            </a>{' '}
            if you are unable to locate your activation email.
          </AlertBox>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            error={isUsernameError}
            fullWidth
            helperText={usernameErrorMessage}
            name="username"
            value={formData.username}
            onChange={handleChange}
            InputLabelProps={{
              style: { fontSize: '14px', color: '#6E6E6E' },
            }}
            InputProps={{
              style: { fontSize: '14px', height: '48px' },
            }}
          />
          <TextField
            label="Password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={isPasswordError}
            helperText={passwordErrorMessage}
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              style: { fontSize: '14px', color: '#6E6E6E' },
            }}
            InputProps={{
              style: { fontSize: '14px', height: '48px' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div className="flex items-center gap-10">
            {isDisabled ? (
              <Spinner alignStyle={'flex justify-center items-center mt-6'} loading={true} />
            ) : (
              <>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    height: '48px',
                    fontWeight: '600',
                    ':hover': { backgroundColor: '#333' },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    height: '48px',
                    fontWeight: '600',
                    ':hover': { backgroundColor: '#333' },
                  }}
                >
                  <Link to="/tmdb-frontend/forgot-password">Reset password</Link>
                </Button>
                <Button
                  onClick={handleClick}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                    color: 'text.primary',
                    height: '48px',
                    fontWeight: '600',
                    ':hover': { borderColor: 'black' },
                  }}
                >
                  <img src={logo_google} alt="Google Logo" style={{ width: '20px', marginRight: '8px' }} />
                  Sign in with Google
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
