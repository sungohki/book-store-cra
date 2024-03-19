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

// {
//     "items": [
//         1,2,3
//     ],
//     "delivery": {
//         "address": "서울시 북구",
//         "receiver": "김나박이",
//         "contact": "010-1111-1111"
//     },
//     "first_book_title": "백설공주들",
//     "total_quantity": 3,
//     "total_price": 60000,
//     "user_id": 2
// }

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
