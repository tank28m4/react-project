import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import cartIconSvg from '../assets/icons/cart-icon.svg';
import logoSvg from '../assets/icons/logo.svg';

const Header = () => {
  const { cartCount } = useCart();
  
  const handleCompanyClick = (e) => {
    e.preventDefault();
  };

  const cartIconStyle = {
    color: '#35B8BE',
    width: '17px',
    height: '17px'
  };

  return (
    <>
      <div
        data-animation="default"
        className="navbar w-nav"
        data-easing2="ease"
        data-easing="ease"
        data-collapse="medium"
        data-w-id="33c883c6-4afc-cc73-3bca-d2857a9d4bc2"
        role="banner"
        data-duration={400}
        id="Navigation"
      >
        <div className="navigation-container">
          <div className="navigation-left">
            <Link to="/" className="brand w-nav-brand">
              <img src={logoSvg} width={40} height={40} alt="Logo" />
            </Link>
          </div>
          <div className="navigation-right">
            <div className="menu-button w-nav-button">
              <div className="icon w-icon-nav-menu" />
            </div>
            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link to="/" className="nav-link w-nav-link">
                Home
              </Link>
              <Link to="/menu" className="nav-link w-nav-link">
                Menu
              </Link>
              <a href="#" onClick={handleCompanyClick} className="nav-link w-nav-link">
                Company
              </a>
              <Link to="/" className="nav-link w-nav-link">
                Login
              </Link>
            </nav>
            <div className="w-commerce-commercecartwrapper">
              <Link to="/" className="w-commerce-commercecartopenlink cart-button w-inline-block">
                <img 
                  src={cartIconSvg} 
                  className="w-commerce-commercecartopenlinkicon cart-icon" 
                  style={cartIconStyle}
                  alt="Cart" 
                />
                <div className="w-commerce-commercecartopenlinkcount cart-quantity">{cartCount}</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header; 