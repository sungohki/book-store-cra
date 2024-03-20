import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText, { InputTextType } from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAlert } from '../hooks/useAlert';
import { signup } from '@/api/auth.api';

type SignupPropsType = 'email' | 'password' | 'name' | 'contact';
type SignupPropsTypeKor = '이메일' | '패스워드' | '이름' | '전화번호';

export interface SignupProps {
  email: string;
  password: string;
  name?: string;
  contact?: string;
}

interface PrivacyInfo {
  info: SignupPropsType;
  infoKor: SignupPropsTypeKor;
  inputType?: InputTextType;
}

function Signup() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const privacyInfo: PrivacyInfo[] = [
    { info: 'email', infoKor: '이메일', inputType: 'email' },
    { info: 'password', infoKor: '패스워드', inputType: 'password' },
    { info: 'name', infoKor: '이름', inputType: 'text' },
    { info: 'contact', infoKor: '전화번호', inputType: 'text' },
  ];

  const onSubmit = (data: SignupProps) => {
    signup(data);
    showAlert('회원 가입 완료');
    console.log(data);
    navigate('/login');
  };

  return (
    <>
      <Title size="large">회원가입</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          {privacyInfo.map((item, index) => (
            <fieldset key={index}>
              <InputText
                placeHolder={item.infoKor}
                inputType={item.inputType}
                {...register(item.info, { required: true })}
              />
              {errors.email && (
                <p className="error-text">{item.infoKor} 입력 필요</p>
              )}
            </fieldset>
          ))}
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
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
export const SignupStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }
  button {
    width: 100%;
  }
  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;
export default Signup;
