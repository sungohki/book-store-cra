import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from '../hooks/useAlert';
import { SignupProps, SignupStyle } from './Signup';
import { useState } from 'react';
import { resetPassword, resetRequest } from '../api/auth.api';

function ResetPassword() {
  const [resetRequested, setResetRequested] = useState(false);
  const navigate = useNavigate();
  const showAlert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    if (resetRequested) {
      resetPassword(data).then(() => {
        showAlert('비밀번호 초기화 완료');
        navigate('/login');
        setResetRequested(false);
      });
    } else {
      resetRequest(data).then(() => {
        setResetRequested(true);
      });
    }
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeHolder="이메일"
              inputType="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>

          {resetRequested && (
            <fieldset>
              <InputText
                placeHolder="비밀번호"
                inputType="password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력해주세요.</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>
        </form>
        <div className="info">
          <Link to={'/reset'}>비밀번호 초기화</Link>
        </div>
      </SignupStyle>
    </>
  );
}

export default ResetPassword;
