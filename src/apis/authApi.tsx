import axiosInstance from './axios';
import { SignUpDto } from '../type/auth/SignUpDto';
import { SignInDto } from '../type/auth/SignInDto';
import { VerifyOtpDto } from '../type/auth/VerifyOtpDto';
import { NewAccessTokenDto } from '../type/auth/NewAccessTokenDto';
import { ResetPasswordDto } from '../type/auth/ResetPasswordDto';
import { user } from '../type/user/user';
import { SignInResponseDto } from '../type/auth/SignInResponseDto';
import { RefreshToken } from '../type/auth/RefreshToken';

export const register = (signUpDto: SignUpDto): Promise<user> =>
  axiosInstance({
    url: '/auth/register',
    method: 'post',
    data: signUpDto,
  });

export const login = (signInDto: SignInDto): Promise<SignInResponseDto> =>
  axiosInstance({
    url: '/auth/login',
    method: 'post',
    data: signInDto,
  });

export const getOtp = (email: string): Promise<string> =>
  axiosInstance({
    url: `/auth/get-otp?email=${email}`,
    method: 'get',
  });

export const verifyOtp = (verifyOtpDto: VerifyOtpDto): Promise<string> =>
  axiosInstance({
    url: '/auth/verify',
    method: 'post',
    data: verifyOtpDto,
  });

export const refreshToken = (newAccessTokenDto: NewAccessTokenDto): Promise<string> =>
  axiosInstance({
    url: '/auth/refresh-token',
    method: 'post',
    data: newAccessTokenDto,
  });

export const verifyOtpChangePassword = (verifyOtpDto: VerifyOtpDto): Promise<RefreshToken> =>
  axiosInstance({
    url: '/auth/verify-password',
    method: 'post',
    data: verifyOtpDto,
  });

export const resetPassword = (resetPasswordDto: ResetPasswordDto): Promise<string> =>
  axiosInstance({
    url: '/auth/reset-password',
    method: 'post',
    data: resetPasswordDto,
  });
