import { setupWorker } from 'msw/browser';
import { addReview, reviewById, reviewForMain } from './review';

const handlers = [reviewById, addReview, reviewForMain];

export const worker = setupWorker(...handlers);
