import styled from 'styled-components';
import BookItem from './BookItem';

const dummyBook = {
  id: 1,
  title: '어린왕자들',
  img: 7,
  category_id: 0,
  form: '종이책',
  isbn: '0',
  summary: '어리다..',
  detail: '많이 어리다..',
  author: '김어림',
  pages: 100,
  contents: '목차입니다.',
  price: 20000,
  pub_date: '2019-01-01',
  likes: 2,
};

function BooksList() {
  return (
    <>
      <BooksListStyle>
        <BookItem book={dummyBook} />
      </BooksListStyle>
    </>
  );
}
const BooksListStyle = styled.div``;

export default BooksList;
