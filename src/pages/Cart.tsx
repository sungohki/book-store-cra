import styled from 'styled-components';
import Title from '../components/common/Title';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import { useMemo, useState } from 'react';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { OrderSheet } from '../models/order.model';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { carts, deleteCartItem, isEmpty } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id].sort());
    }
  };
  const handleDeleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cur) => {
      if (checkedItems.includes(cur.id)) {
        return acc + cur.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);
  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cur) => {
      if (checkedItems.includes(cur.id)) {
        return acc + cur.price * cur.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해주세요.');
      return;
    }
    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      total_quantity: totalQuantity,
      total_price: totalPrice,
      first_book_title: carts.find((item) => item.id === checkedItems[0])
        ?.title as string,
    };
    showConfirm('주문 하시겠습니까?', () => {
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">Cart</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem
                  key={item.id}
                  cart={item}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
              />
              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문 하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title="장바구니가 비었습니다."
            description={<>장바구니를 채워보세요.</>}
          />
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export default Cart;
