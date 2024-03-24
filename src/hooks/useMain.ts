import { fetchBestBooks, fetchBooks } from '@/api/books.api';
import { fetchReviewAll } from '@/api/review.api';
import { Book, BookReviewItem } from '@/models/book.model';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);

  useEffect(() => {
    // fetch bset books api
    fetchBestBooks().then((books) => {
      setBestBooks(books);
    });

    // fetch new books api
    fetchBooks({
      category_id: undefined,
      news: true,
      currentPage: 1,
      limit: 4,
    }).then(({ books }) => {
      setNewBooks(books);
    });

    // fetch review api
    fetchReviewAll().then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return { reviews, newBooks, bestBooks };
};
