import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../context/auth-context';

export default function Authenticate(): JSX.Element {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const { updateAfterLogin } = useAuth();
  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      fetch(`${BACKEND_URL}/auth/outbound/authentication?code=${authCode}`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          updateAfterLogin(data.user, data.accessToken, data.refreshToken);
          navigate('/tmdb-frontend');
          setIsLoggedin(true);
        })
        .catch((error) => {
          console.error('Authentication failed:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate('/tmdb-frontend');
    }
  }, [isLoggedin, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
      <Typography>Authenticating...</Typography>
    </Box>
  );
}
