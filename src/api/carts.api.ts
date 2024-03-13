import { httpClient } from './http';

interface AddCartParams {
  book_id: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const res = await httpClient.post('/carts', params);
  return res.data;
};
