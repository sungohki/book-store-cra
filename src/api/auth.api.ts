import { SignupProps } from '../pages/Signup';
import { requestHandler } from './http';

export const signup = async (userData: SignupProps) => {
  return await requestHandler<SignupProps>('post', '/users/join', userData);
};

export const resetRequest = async (data: SignupProps) => {
  return await requestHandler<SignupProps>('post', '/users/reset', data);
};

export const resetPassword = async (data: SignupProps) => {
  return await requestHandler<SignupProps>('put', '/users/reset', data);
};

interface LoginResponse {
  token: string;
}

export const login = async (data: SignupProps) => {
  return await requestHandler<SignupProps>('post', '/users/login', data).then(
    (item) => item as LoginResponse
  );
};
