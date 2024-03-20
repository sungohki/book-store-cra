import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

export type InputTextType = 'text' | 'email' | 'password' | 'number';
export interface IInputText
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeHolder?: string;
  inputType?: InputTextType;
}

const InputText = React.forwardRef(
  (
    { placeHolder, inputType, onChange, ...props }: IInputText,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeHolder}
        type={inputType}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
