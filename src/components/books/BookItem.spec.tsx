import React from 'react';
import { render } from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/themeContext';

const dummyBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  form: 'Dummry Form',
  isbn: '0',
  summary: 'Dummy Summary',
  detail: 'Dummy Detail',
  author: 'Dummy Author',
  pages: 100,
  contents: 'Dummy Contents',
  price: 20000,
  pub_date: '2019-01-01',
  likes: 1,
};

describe('BookItem', () => {
  it('렌더 여부', () => {
    const { getByText, getByAltText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText('20,000원')).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    expect(getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
