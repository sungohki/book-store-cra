import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignupProps, SignupStyle } from './Signup';
import { useAuth } from '@/hooks/useAuth';

function Login() {
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    userLogin(data);
  };

  return (
    <>
      <Title size="large">로그인</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeHolder="이메일"
              inputType="email"
              {...register('email', { required: true })}
              inputMode="email"
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeHolder="비밀번호"
              inputType="password"
              {...register('password', { required: true })}
              inputMode="text"
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
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

export default Login;
