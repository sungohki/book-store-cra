import { Book } from '../models/book.model';
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
