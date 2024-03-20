import styled from 'styled-components';
import { BookDetail } from '@/models/book.model';
import InputText from '../common/InputText';
import Button from '../common/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBook } from '@/hooks/useBook';

interface Props {
  book: BookDetail;
}

function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleQuantity}
        />
        <Button
          size="medium"
          scheme="normal"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </Button>
        <Button
          size="medium"
          scheme="normal"
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
        >
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToCart(quantity)}
      >
        장바구니 담기
      </Button>
      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to={'/cart'}>장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    text-align: center;
    right: 0%;
    top: 100%;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? '1' : '0')};
    /* opacity: 1; */
    transition: all 0.5s ease;
    p {
      padding: 0 0 8px 0;
      margin: 1;
    }
  }
`;

export default AddToCart;
