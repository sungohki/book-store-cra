import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { SignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const useAuth = () => {
  const [resetRequested, setResetRequested] = useState(false);
  const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // 로그인
  const userLogin = (data: SignupProps) => {
    login(data).then(
      (res) => {
        storeLogin(res.token);
        showAlert('로그인 완료');
        navigate('/');
      },
      (err) => {
        showAlert('로그인 실패');
      }
    );
  };

  // 회원 가입
  const userSignup = (data: SignupProps) => {
    signup(data).then(() => {
      showAlert('회원 가입 완료');
      navigate('/login');
    });
  };

  // 비밀 번호 초기화
  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호 초기화 완료');
      navigate('/login');
      setResetRequested(false);
    });
  };

  // 비밀 번호 초기화 요청
  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
