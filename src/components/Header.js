import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Header() {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleCompanyClick = (e) => {
    e.preventDefault();
    navigate('/');
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
              <img
                src="https://cdn.prod.website-files.com/5e865e09d8efa3310676b585/5e865e09d8efa341ab76b5e7_Logo.svg"
                width={40}
                alt=""
              />
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
                <svg className="w-commerce-commercecartopenlinkicon cart-icon" width="17px" height="17px" viewBox="0 0 17 17">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M2.60592789,2 L0,2 L0,0 L4.39407211,0 L4.84288393,4 L16,4 L16,9.93844589 L3.76940945,12.3694378 L2.60592789,2 Z M15.5,17 C14.6715729,17 14,16.3284271 14,15.5 C14,14.6715729 14.6715729,14 15.5,14 C16.3284271,14 17,14.6715729 17,15.5 C17,16.3284271 16.3284271,17 15.5,17 Z M5.5,17 C4.67157288,17 4,16.3284271 4,15.5 C4,14.6715729 4.67157288,14 5.5,14 C6.32842712,14 7,14.6715729 7,15.5 C7,16.3284271 6.32842712,17 5.5,17 Z" 
                    fill="currentColor" fillRule="nonzero"></path>
                  </g>
                </svg>
                <div className="w-commerce-commercecartopenlinkcount cart-quantity">{cartCount}</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header; 