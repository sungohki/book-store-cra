import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle>
      <Button size="medium" scheme="normal">
        <FaHeart />
        {book.likes}
      </Button>
    </LikeButtonStyle>
  );
}
const LikeButtonStyle = styled.div``;

export default LikeButton;
