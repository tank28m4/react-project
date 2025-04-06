import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';

import burgerDreams from '../assets/images/burger dreams.png';
import burgerWaldo from '../assets/images/burger waldo.png';
import burgerCali from '../assets/images/burger cali.png';
import burgerBaconBuddy from '../assets/images/burger bacon buddy\'.png';
import burgerSpicy from '../assets/images/burger spicy.png';
import burgerClassic from '../assets/images/burger classic.png';

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
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = 'https://assets.website-files.com/5e865e09d8efa3310676b585/css/chomp.webflow.b84e4399e.css';
    document.head.appendChild(linkElement);
    
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
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
      <Header />
      
      <div className="header-section" style={{backgroundColor: '#f5f9fc', padding: '50px 0', clipPath: 'polygon(0.125rem 4.75rem, 100% 0%, 100% 100%, 0% 100%)'}}>
        <div className="container-flex">
          <div className="title-wrap-centre" style={{width: '100%', maxWidth: '700px', margin: '0 auto'}}>
            <h1 
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#35B8BE',
                fontSize: '64px',
                fontWeight: '400',
                marginBottom: '20px',
                textAlign: 'center',
                lineHeight: '1.2'
              }}
            >
              Browse our menu
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px', 
              marginBottom: '30px', 
              color: '#546285', 
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
                           Use our menu to place an order online, or <span 
                style={{ 
                  color: '#35B8BE',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const tooltip = document.createElement('div');
                  tooltip.className = 'phone-tooltip';
                  tooltip.innerText = '+375 (77) 7-77-77';
                  tooltip.style.position = 'absolute';
                  tooltip.style.backgroundColor = '#35B8BE';
                  tooltip.style.color = 'white';
                  tooltip.style.padding = '5px 10px';
                  tooltip.style.borderRadius = '4px';
                  tooltip.style.fontSize = '14px';
                  tooltip.style.bottom = '100%';
                  tooltip.style.left = '50%';
                  tooltip.style.transform = 'translateX(-50%)';
                  tooltip.style.whiteSpace = 'nowrap';
                  tooltip.style.zIndex = '1000';
                  tooltip.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                  e.currentTarget.appendChild(tooltip);
                }}
                onMouseLeave={(e) => {
                  const tooltip = e.currentTarget.querySelector('.phone-tooltip');
                  if (tooltip) {
                    e.currentTarget.removeChild(tooltip);
                  }
                }}
              >phone</span> our store 
              to place a pickup order. Fast and fresh food.
            </p>
            
            <div className="tab-menu-round w-tab-menu" role="tablist" style={{display: 'flex', justifyContent: 'center', marginBottom: '40px'}}>
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
      
      <div className="content-section" style={{opacity: 1, backgroundColor: '#f5f9fc'}}>
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
      
      <Footer />
    </>
  );
}

export default Menu; 