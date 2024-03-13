import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagiantion.model';
import { httpClient } from './http';

interface FetchParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksRes {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchParams) => {
  try {
    const res = await httpClient.get<FetchBooksRes>('/books', {
      params: params,
    });
    return res.data;
  } catch (err) {
    return {
      books: [],
      pagination: {
        total_count: 0,
        current_page: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const res = await httpClient.get<BookDetail>(`/books/${bookId}`);
  return res.data;
};

export const likeBook = async (bookId: number) => {
  const res = await httpClient.post(`/likes/${bookId}`);
  return res.data;
};
