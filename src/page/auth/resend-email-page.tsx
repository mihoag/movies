import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../../components/shared/spinner';
import { showSuccess } from '../../util/SuccessToastifyRender';
import { getOtp } from '../../apis/authApi';

// Define the LoginPage component
const ResendEmailPage: React.FC = () => {
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setEmail(value);
  };
  function validateEmail(email: string): boolean {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Valid email is required');
      return false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
      return true;
    }
  }

  const handleSubmit = async function () {
    setDisabled(true);
    if (validateEmail(email)) {
      try {
        await getOtp(email);
        showSuccess('Activation email resent successfully! Please check your email.');
        navigate('/tmdb-frontend/send-otp-verify-account/' + email);
      } catch (error) {
        console.log('Failed to resend activation email: ' + error);
      }
    }
    setDisabled(false);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-2 my-2 px-4 font-sans">
      <h1 className="text-[1.5em] font-semibold text-black mb-2 leading-[1.1]">Resend activation email</h1>
      <p className="mb-5 text-[16px] leading-[1.5]">
        Missing your account verification email? Enter your email below to have it resent.
      </p>
      <form className="space-y-6">
        <TextField
          label="Email"
          placeholder="What's your email?"
          type="text"
          variant="outlined"
          fullWidth
          id="email"
          onChange={handleChange}
          name="email"
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
                Send
              </Button>
              <Link to="/tmdb-frontend/login" className="text-blue-500 font-semibold hover:underline">
                Cancel
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResendEmailPage;
