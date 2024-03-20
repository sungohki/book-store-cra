import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '@/context/themeContext';
import InputText from './InputText';
import React from 'react';

describe('InputText 컴포넌트 테스트', () => {
  it('렌더를 확인', () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeHolder="여기에 입력" />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
  });

  it('forwardRef 테스트', () => {
    // 1. 렌더
    const ref = React.createRef<HTMLInputElement>();
    const { container } = render(
      <BookStoreThemeProvider>
        <InputText placeHolder="여기에 입력" ref={ref} />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
