import React, { useState, useReducer } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/shared/spinner';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { ResetPasswordDto } from '../../type/auth/ResetPasswordDto';
import { showSuccess } from '../../util/SuccessToastifyRender';
import { resetPassword } from '../../apis/authApi';

// Define the LoginPage component
const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isUsernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');

  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [isConfirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [isDisabled, setDisabled] = useState<boolean>(false);
  interface formInput {
    username: string;
    password: string;
    confirmPassword: string;
  }

  // Initial form data
  const initialData: formInput = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  // Reducer function for form data
  function formReducer(state: formInput, action: { name: string; value: string }): formInput {
    return {
      ...state,
      [action.name]: action.value,
    };
  }
  const [formData, dispatch] = useReducer(formReducer, initialData);

  function handleClickShowPassword(): void {
    setShowPassword(!showPassword);
  }

  function handleClickShowConfirmPassword(): void {
    setShowConfirmPassword(!showConfirmPassword);
  }
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
  // Validate form data
  const validateFormData = (formData: formInput): boolean => {
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

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async function () {
    setDisabled(true);
    if (validateFormData(formData) && token) {
      const resetPasswordDto: ResetPasswordDto = {
        password: formData.password,
        refreshToken: token,
      };

      try {
        await resetPassword(resetPasswordDto);
        showSuccess('Password reset successfully! You can now log in with your new password.');
        navigate('/tmdb-frontend/login');
      } catch (error) {
        console.log('Failed to reset password: ' + error);
      }
    }

    setDisabled(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-2 my-2 px-4 font-sans">
      <h1 className="text-[1.5em] font-semibold text-black mb-5 leading-[1.1]">Reset password</h1>

      <form className="space-y-6">
        <TextField
          label="Username"
          placeholder="Username"
          type="text"
          variant="outlined"
          fullWidth
          id="username"
          onChange={handleChange}
          name="username"
          error={isUsernameError}
          helperText={usernameErrorMessage}
          color={isUsernameError ? 'error' : 'primary'}
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
          variant="outlined"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          id="password"
          name="password"
          error={isPasswordError}
          helperText={passwordErrorMessage}
          color={isPasswordError ? 'error' : 'primary'}
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
        <TextField
          label="Confirm Password"
          placeholder="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          onChange={handleChange}
          id="confirmPassword"
          name="confirmPassword"
          error={isConfirmPasswordError}
          helperText={confirmPasswordErrorMessage}
          color={isConfirmPasswordError ? 'error' : 'primary'}
          InputLabelProps={{
            style: { fontSize: '14px', color: '#6E6E6E' },
          }}
          InputProps={{
            style: { fontSize: '14px', height: '48px' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  height: '38px',
                  width: '90px',
                  fontWeight: '600',
                  ':hover': { backgroundColor: '#333' },
                }}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
