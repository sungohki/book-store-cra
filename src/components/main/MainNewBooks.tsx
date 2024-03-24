import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
  books: Book[];
}
function MainNewBooks({ books }: Props) {
  return (
    <MainNewBooksStyle>
      {books.map((item) => (
        <BookItem key={item.id} book={item} view="grid" />
      ))}
    </MainNewBooksStyle>
  );
}

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
