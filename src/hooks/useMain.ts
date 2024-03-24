import { fetchBanners } from '@/api/banner.api';
import { fetchBestBooks, fetchBooks } from '@/api/books.api';
import { fetchReviewAll } from '@/api/review.api';
import { Banner } from '@/models/banner.model';
import { Book, BookReviewItem } from '@/models/book.model';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [bestBooks, setBestBooks] = useState<Book[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    // fetch banners api
    fetchBanners().then((banners) => {
      setBanners(banners);
    });

    // fetch best books api
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

  return { reviews, newBooks, bestBooks, banners };
};
