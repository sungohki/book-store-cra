import { SignupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  const res = await httpClient.post('/users/join', {
    ...userData,
    name: 'kim',
    contact: '010-1111-1111',
  });
  return res.data;
};
