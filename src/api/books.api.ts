import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagiantion.model';
import { httpClient, requestHandler } from './http';

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
    console.log(err);
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
  return await requestHandler('get', `/books/${bookId}`);
};

export const likeBook = async (bookId: number) => {
  return await requestHandler('post', `/likes/${bookId}`);
};
