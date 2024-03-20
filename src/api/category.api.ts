import { requestHandler } from './http';

export const fetchCategory = async () => {
  return await requestHandler('get', '/category');
};
