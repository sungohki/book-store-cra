import styled from 'styled-components';
import Button from '../common/Button';
import { useEffect } from 'react';

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

function FindAdressButton({ onCompleted }: Props) {
  // 스크립트 코드

  // 핸들러

  // 입력
  const handleOpen = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  useEffect(() => {
    const script = document.createElement('script'); // <script /> 태그 생성
    script.src = SCRIPT_URL; // src 할당
    script.async = true;
    document.head.appendChild(script); // html 헤더에 <script /> 태그 추가

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
}

const FindAdressButtonStyle = styled.div``;

export default FindAdressButton;
