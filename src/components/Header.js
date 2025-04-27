import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import cartIconSvg from '../assets/icons/cart-icon.svg';
import logoSvg from '../assets/icons/logo.svg';

const cartIconStyle = {
  color: '#35B8BE',
  width: '17px',
  height: '17px'
};

class HeaderClass extends Component {
  constructor(props) {
    super(props);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
  }

  handleCompanyClick(e) {
    e.preventDefault();
  }

  render() {
    const { cartCount } = this.props;

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
                <a href="#" onClick={this.handleCompanyClick} className="nav-link w-nav-link">
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
  }
}

function Header() {
  const { cartCount } = useCart();
  return <HeaderClass cartCount={cartCount} />;
}

export default Header; 