import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCartItems, clearCart, updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import { placeOrderStart, placeOrderSuccess, placeOrderFailed } from '../store/slices/orderSlice';
import { v4 as uuidv4 } from 'uuid';

interface Address {
  street: string;
  house: string;
}

const CartSection = styled.div`
  background-color: var(--background-color);
  padding: 50px 0;
  min-height: calc(100vh - 200px);
`;

const CartContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CartTitle = styled.h1`
  font-family: Inter, sans-serif;
  color: var(--text-color);
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
`;

const CartItem = styled.div`
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const ItemLeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const ItemDetails = styled.div``;

const ItemTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
`;

const ItemRightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.div`
  color: var(--button-color);
  font-weight: 500;
  margin-right: 20px;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-right: 15px;
  text-align: center;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const RemoveButton = styled.button`
  background-color: var(--button-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
`;

const AddressForm = styled.div`
  margin-top: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  width: 100px;
  font-weight: 500;
  color: var(--text-color);
`;

const FormInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const OrderButton = styled.button`
  background-color: var(--button-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px 50px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  color: var(--text-color);
  font-size: 18px;
`;

const GoToMenuButton = styled.button`
  background-color: var(--button-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 30px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Cart: React.FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const [address, setAddress] = useState<Address>({ street: '', house: '' });
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleOrder = () => {
    if (!address.street || !address.house) {
      alert('Please fill in the delivery address');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    dispatch(placeOrderStart());
    try {
      const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
      const newOrder = {
        id: uuidv4(),
        items: cartItems,
        address,
        totalAmount: parseFloat(totalPrice),
        date: new Date().toISOString()
      };
      
      dispatch(placeOrderSuccess(newOrder));
      alert('Order successfully placed!');
      dispatch(clearCart());
      navigate('/');
    } catch (error) {
      dispatch(placeOrderFailed('Failed to place order'));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  React.useEffect(() => {
    document.title = "Cart";
  }, []);

  return (
    <CartSection>
      <CartContainer>
        <CartTitle>
          Finish your order
        </CartTitle>

        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <ItemLeftSection>
                  <ItemImage 
                    src={item.img} 
                    alt={item.meal} 
                  />
                  <ItemDetails>
                    <ItemTitle>
                      {item.meal}
                    </ItemTitle>
                  </ItemDetails>
                </ItemLeftSection>

                <ItemRightSection>
                  <ItemPrice>
                    $ {item.price.toFixed(2)} USD
                  </ItemPrice>
                  <QuantityInput 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => dispatch(updateQuantity({ productId: item.id, quantity: parseInt(e.target.value) }))}
                  />
                  <RemoveButton onClick={() => dispatch(removeFromCart(item.id))}>
                    X
                  </RemoveButton>
                </ItemRightSection>
              </CartItem>
            ))}

            <AddressForm>
              <FormGroup>
                <FormLabel htmlFor="street-input">
                  Street
                </FormLabel>
                <FormInput 
                  id="street-input"
                  type="text" 
                  name="street" 
                  value={address.street} 
                  onChange={handleAddressChange} 
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="house-input">
                  House
                </FormLabel>
                <FormInput 
                  id="house-input"
                  type="text" 
                  name="house" 
                  value={address.house}
                  onChange={handleAddressChange} 
                />
              </FormGroup>

              <ButtonContainer>
                <OrderButton onClick={handleOrder}>
                  Order
                </OrderButton>
              </ButtonContainer>
            </AddressForm>
          </div>
        ) : (
          <EmptyCartMessage>
            <p>Your cart is empty</p>
            <GoToMenuButton onClick={() => navigate('/menu')}>
              Go to menu
            </GoToMenuButton>
          </EmptyCartMessage>
        )}
      </CartContainer>
    </CartSection>
  );
};

export default Cart; 