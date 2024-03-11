import { Category } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  console.log('호출');
  const response = await httpClient.get('/category');
  console.log('호출 후');
  return response.data;
};
