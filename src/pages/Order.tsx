import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartStyle } from './Cart';
import Title from '../components/common/Title';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '../models/order.model';
import FindAdressButton from '../components/order/FindAddressButton';
import { useAlert } from '../hooks/useAlert';
import { order } from '../api/order.api';

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

function Order() {
  const location = useLocation();
  const orderDataFromCart = location.state;
  const { total_price, total_quantity, first_book_title } = orderDataFromCart;
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeliveryForm>();

  console.log(orderDataFromCart);

  const handlePay = (data: DeliveryForm) => {
    const orderData: OrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    // 서버로 주문 정보 전달
    showConfirm('주문 하시겠습니까?', () => {
      order(orderData).then(() => {
        showAlert('주문이 처리되었습니다.');
        navigate('/orderlist');
      });
    });
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>
      <OrderStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>
            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAdressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('addressDetail', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세주소를 입력해주세요</p>
              )}
              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">수령인 이름을 입력해주세요</p>
              )}
              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">연락처를 입력해주세요</p>
              )}
            </form>
          </div>
          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>
            <strong>
              {first_book_title} 포함 총 {total_quantity} 권
            </strong>
          </div>
        </div>

        <div className="summary">
          <CartSummary
            totalPrice={total_price}
            totalQuantity={total_quantity}
          />
          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </OrderStyle>
    </>
  );
}

const OrderStyle = styled(CartStyle)`
  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Order;
