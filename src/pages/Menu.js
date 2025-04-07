import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import PhoneTooltip from '../components/PhoneTooltip';
import './Menu.css';

import burgerDreams from '../assets/images/burger-dreams.png';
import burgerWaldo from '../assets/images/burger-waldo.png';
import burgerCali from '../assets/images/burger-cali.png';
import burgerBaconBuddy from '../assets/images/burger-bacon-buddy.png';
import burgerSpicy from '../assets/images/burger-spicy.png';
import burgerClassic from '../assets/images/burger-classic.png';

function Menu() {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({
    'burger-dreams': 1,
    'burger-waldo': 1,
    'burger-cali': 1,
    'burger-bacon-buddy': 1,
    'burger-spicy': 1,
    'burger-classic': 1
  });

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: parseInt(value, 10)
    }));
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    const quantity = quantities[product.id];
    
    addToCart(product, quantity);
    
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  React.useEffect(() => {
    document.title = "Menu";
  }, []);

  const products = [
    {
      id: 'burger-dreams',
      name: 'Burger Dreams',
      price: 9.20,
      image: burgerDreams,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 'burger-waldo',
      name: 'Burger Waldo',
      price: 10.00,
      image: burgerWaldo,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 'burger-cali',
      name: 'Burger Cali',
      price: 8.00,
      image: burgerCali,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 'burger-bacon-buddy',
      name: 'Burger Bacon Buddy',
      price: 9.99,
      image: burgerBaconBuddy,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 'burger-spicy',
      name: 'Burger Spicy',
      price: 9.20,
      image: burgerSpicy,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      id: 'burger-classic',
      name: 'Burger Classic',
      price: 8.00,
      image: burgerClassic,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ];

  return (
    <>
      <div className="header-section">
        <div className="container-flex">
          <div className="title-wrap-centre">
            <h1 className="menu-title">
              Browse our menu
            </h1>
            <p className="menu-description">
              Use our menu to place an order online, or <PhoneTooltip phoneNumber="+375 (77) 7-77-77" /> our store 
              to place a pickup order. Fast and fresh food.
            </p>
            
            <div className="tab-menu-round w-tab-menu tab-menu-container" role="tablist">
              <a data-w-tab="Desert" className="tab-link-round w-inline-block w-tab-link w--current" id="w-tabs-0-data-w-tab-0" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
                <div>Desert</div>
              </a>
              <a data-w-tab="Dinner" className="tab-link-round w-inline-block w-tab-link" tabIndex="-1" id="w-tabs-0-data-w-tab-1" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-1" aria-selected="false">
                <div>Dinner</div>
              </a>
              <a data-w-tab="Breakfast" className="tab-link-round w-inline-block w-tab-link" tabIndex="-1" id="w-tabs-0-data-w-tab-2" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
                <div>Breakfast</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-section">
        <div className="container">
          <div data-duration-in="300" data-duration-out="100" data-current="Desert" data-easing="ease" className="w-tabs">
            <div className="w-tab-content">
              <div data-w-tab="Desert" className="tab-pane-wrap w-tab-pane w--tab-active" id="w-tabs-0-data-w-pane-0" role="tabpanel" aria-labelledby="w-tabs-0-data-w-tab-0">
                <div className="w-dyn-list">
                  <div role="list" className="order-collection w-dyn-items w-row">
                    
                    {products.map((product) => (
                      <div key={product.id} role="listitem" className="menu-item w-dyn-item w-col w-col-6">
                        <div className="food-card">
                          <Link to={`/product/${product.id}`} className="food-image-square w-inline-block">
                            <img alt={product.name} src={product.image} className="food-image" />
                          </Link>
                          <div className="food-card-content">
                            <Link to={`/product/${product.id}`} className="food-title-wrap w-inline-block">
                              <h6>{product.name}</h6>
                              <div className="price">$&nbsp;{product.price.toFixed(2)}&nbsp;USD</div>
                            </Link>
                            <p className="paragraph">{product.description}</p>
                            <div className="add-to-cart">
                              <form className="w-commerce-commerceaddtocartform default-state" onSubmit={(e) => handleAddToCart(e, product)}>
                                <input 
                                  type="number" 
                                  pattern="^[0-9]+$" 
                                  inputMode="numeric" 
                                  min="1" 
                                  className="w-commerce-commerceaddtocartquantityinput quantity" 
                                  value={quantities[product.id]} 
                                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                />
                                <input type="submit" className="w-commerce-commerceaddtocartbutton order-button" value="Add to Cart" />
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  </div>
                  <div role="navigation" aria-label="List" className="w-pagination-wrapper pagination">
                    <a href="#" aria-label="Next Page" className="w-pagination-next pagination-button">
                      <div className="w-inline-block">See more</div>
                      <svg className="w-pagination-next-icon" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
                        <path fill="none" stroke="currentColor" fillRule="evenodd" d="M4 2l4 4-4 4"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu; 