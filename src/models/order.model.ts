export interface Order {
  order_id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}

export interface OrderSheet {
  items: number[];
  delivery: Delivery;
  first_book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderDetailItem {
  book_id: number;
  author: string;
  price: number;
  quantity: number;
  title: string;
}
