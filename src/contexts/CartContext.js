import React, { createContext, Component } from 'react';

const CartContext = createContext();

export const useCart = () => React.useContext(CartContext);

export class CartProvider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cartItems: JSON.parse(localStorage.getItem('cart')) || [],
      cartCount: 0
    };
    
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
  }
  
  componentDidMount() {
    this.updateCartCount();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) {
      localStorage.setItem('cart', JSON.stringify(this.state.cartItems));
      this.updateCartCount();
    }
  }
  
  updateCartCount() {
    const count = this.state.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.setState({ cartCount: count });
  }
  
  addToCart(product, quantity = 1) {
    this.setState(prevState => {
      const existingItemIndex = prevState.cartItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevState.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return { cartItems: updatedItems };
      } else {
        return { cartItems: [...prevState.cartItems, { ...product, quantity }] };
      }
    });
  }
  
  removeFromCart(productId) {
    this.setState(prevState => ({
      cartItems: prevState.cartItems.filter(item => item.id !== productId)
    }));
  }
  
  updateQuantity(productId, quantity) {
    this.setState(prevState => {
      if (quantity <= 0) {
        return {
          cartItems: prevState.cartItems.filter(item => item.id !== productId)
        };
      }
      
      return {
        cartItems: prevState.cartItems.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      };
    });
  }
  
  clearCart() {
    this.setState({ cartItems: [] });
  }
  
  getCartTotal() {
    return this.state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  }
  
  render() {
    const value = {
      cartItems: this.state.cartItems,
      cartCount: this.state.cartCount,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      updateQuantity: this.updateQuantity,
      clearCart: this.clearCart,
      getCartTotal: this.getCartTotal
    };
    
    return (
      <CartContext.Provider value={value}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext; 