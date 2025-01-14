import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/shared/spinner';
import { showSuccess } from '../../util/SuccessToastifyRender';
import { VerifyOtpDto } from '../../type/auth/VerifyOtpDto';
import { verifyOtpChangePassword } from '../../apis/authApi';
import { getOtp } from '../../apis/authApi';
// Define th LoginPage component
const SendOtpPage: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>('');
  const [isOtpError, setOtpError] = useState<boolean>(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>('');
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const validateOtp = (otp: string): boolean => {
    if (otp.length < 6) {
      setOtpError(true);
      setOtpErrorMessage('OTP must be 6 digits');
      return false;
    } else {
      setOtpError(false);
      setOtpErrorMessage('');
      return true;
    }
  };

  const handleResendOtp = async () => {
    if (email) {
      try {
        await getOtp(email);
        showSuccess('OTP resent successfully! Please check your email.');
      } catch (error) {
        console.log('Failed to resend OTP: ' + error);
      }
    }
  };

  const handleSubmit = async function () {
    setDisabled(true);
    if (validateOtp(otp) && email) {
      const verifyOtpDto: VerifyOtpDto = {
        otp,
        email,
      };

      try {
        const response = await verifyOtpChangePassword(verifyOtpDto);
        showSuccess('OTP verified successfully! You can now reset your password.');
        console.log(response);
        navigate(`/tmdb-frontend/reset-password/${response.token}`);
      } catch (error) {
        console.log('Failed to verify OTP: ' + error);
      }
    }
    setDisabled(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setOtp(value);
  };

  return (
    <div className="max-w-[1200px] mx-auto py-10 my-10 px-4 font-sans">
      <h1 className="text-[1.5em] font-semibold text-black mb-5 leading-[1.1]">Send OTP</h1>

      <p className="mb-5 text-[16px] leading-[1.5]">
        Enter the OTP you received on your email address to reset your password. The OTP is valid for 5 minutes only.
        After that, you will need to request a new OTP.
      </p>
      <form className="space-y-6">
        <TextField
          label="OTP"
          placeholder="Enter OTP"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={otp}
          id="otp"
          name="otp"
          error={isOtpError}
          helperText={otpErrorMessage}
          color={isOtpError ? 'error' : 'primary'}
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
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  height: '38px',
                  width: '120px',
                  fontWeight: '600',
                  ':hover': { backgroundColor: '#333' },
                }}
                onClick={handleResendOtp}
              >
                Resend OTP
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SendOtpPage;
