import { BookReviewItem } from '@/models/book.model';
import { fakerKO as faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

const mockReviewData: BookReviewItem[] = Array.from({ length: 9 }).map(
  (item, index) => {
    return {
      id: index,
      userName: faker.person.firstName(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.past().toISOString(),
      score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    };
  }
);

export const reviewById = http.get(
  'http://localhost:9999/reviews/:bookId',
  () => {
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  }
);

// msw http response
// 메서드 제공, 응답 데이터 반환

export const addReview = http.post(
  'http://localhost:9999/reviews/:bookId',
  () => {
    return HttpResponse.json(
      {
        message: '리뷰가 등록되었습니다.',
      },
      {
        status: 200,
      }
    );
  }
);
