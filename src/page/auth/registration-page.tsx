import { Check } from 'lucide-react';
import Button from '../../components/shared/button';
import { Card } from '../../components/shared/card';
import { Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useReducer } from 'react';
import Spinner from '../../components/shared/spinner';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { benefits } from '../../data/benefits';
import { register } from '../../apis/authApi';
import { SignUpDto } from '../../type/auth/SignUpDto';

interface formInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define form data interface
const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

  const [isUsernameError, setUsernameError] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');

  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [isConfirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const [isDisabled, setDisabled] = useState<boolean>(false);

  const initialData: formInput = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // Handle visibility toggle for password fields
  function handleClickShowPassword(): void {
    setShowPassword(!showPassword);
  }

  function handleClickShowConfirmPassword(): void {
    setShowConfirmPassword(!showConfirmPassword);
  }

  // Reducer for form state management
  function formReducer(state: formInput, action: { name: string; value: string }): formInput {
    return {
      ...state,
      [action.name]: action.value,
    };
  }

  const [formData, dispatch] = useReducer(formReducer, initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    dispatch({ name, value });
  };

  // Reset error messages
  function resetAllErrorMessage(): void {
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
    setUsernameError(false);
    setUsernameErrorMessage('');
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage('');
  }

  // Validate form data
  function validateFormData(formData: formInput): boolean {
    let isValid = true;

    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(formData.username)) {
      setUsernameError(true);
      setUsernameErrorMessage(
        'Username must start with a letter, be at least 6 characters long, and contain only letters, numbers, or underscores.',
      );
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError(true);
      setEmailErrorMessage('Valid email is required');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/.test(formData.password)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        'Password must contain at least 6 characters, one uppercase letter, one digit, and one special character (!@#$%^&*()).',
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
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
  }

  // Handle form submission
  async function handleSubmit(): Promise<void> {
    setDisabled(true);

    if (validateFormData(formData)) {
      setDisabled(true);

      if (validateFormData(formData)) {
        resetAllErrorMessage();
        const signUpDto: SignUpDto = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        };
        try {
          await register(signUpDto);
          const isNotVeriable = true;
          navigate('/tmdb-frontend/send-otp-verify-account/' + formData.email, { state: { isNotVeriable } });
        } catch (error) {
          console.log('Registration failed: ' + error);
        }
      }
    }
    setDisabled(false);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Benefits Section */}
        <div className="border rounded-[12px]  shadow-md">
          <Card className="bg-[#01B4E4] rounded-t-[12px]  p-6 text-white">
            <h2 className="text-xl font-bold">Benefits of being a member</h2>
          </Card>
          <div className="mt-6 p-6 space-y-4">
            {benefits.map((benefit, i) => (
              <BenefitItem key={i} text={benefit.text} />
            ))}
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Sign up for an account</h1>
            <p className="mt-2 text-gray-600">
              Signing up for an account is free and easy. Fill out the form below to get started.
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                placeholder="Enter your email"
                variant="outlined"
                fullWidth
                value={formData.email}
                id="email"
                name="email"
                onChange={handleChange}
                error={isEmailError}
                helperText={emailErrorMessage}
                color={isEmailError ? 'error' : 'primary'}
                InputLabelProps={{
                  style: { fontSize: '14px', color: '#6E6E6E' },
                }}
                InputProps={{
                  style: { fontSize: '14px', height: '48px' },
                }}
              />

              <TextField
                label="Username"
                placeholder="Username"
                type="text"
                variant="outlined"
                fullWidth
                id="username"
                onChange={handleChange}
                name="username"
                value={formData.username}
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
                value={formData.password}
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
                value={formData.confirmPassword}
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
            </Stack>
            <div className="flex space-x-4 justify-content-center">
              {!isDisabled ? (
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-[#01B4E4] px-2 py-2 rounded-[10px] text-white hover:bg-[#01a4d4]"
                >
                  Sign Up
                </Button>
              ) : (
                <Spinner alignStyle={'flex justify-center items-center mt-6'} loading={true} />
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-start space-x-2">
      <Check className="mt-1 h-4 w-4 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export default RegistrationPage;
