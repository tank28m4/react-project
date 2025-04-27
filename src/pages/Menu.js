import React, { Component } from 'react';
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

class MenuClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      meals: [],
      visibleMeals: [],
      quantities: {},
      currentPage: 1,
      itemsPerPage: 6,
      hasMore: true
    };
    
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
  }
  
  componentDidMount() {
    document.title = "Menu";
    this.fetchMeals();
  }
  
  fetchMeals() {
    fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals')
      .then(response => response.json())
      .then(data => {
        const quantities = {};
        
        data.forEach(meal => {
          quantities[meal.id] = 1;
        });
        
        this.setState({
          meals: data,
          visibleMeals: data.slice(0, this.state.itemsPerPage),
          quantities,
          loading: false,
          hasMore: data.length > this.state.itemsPerPage
        });
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
        this.setState({ loading: false });
      });
  }

  loadMoreItems(e) {
    e.preventDefault();
    
    const { currentPage, itemsPerPage, meals } = this.state;
    const nextPage = currentPage + 1;
    const newVisibleItems = meals.slice(0, nextPage * itemsPerPage);
    
    this.setState({
      currentPage: nextPage,
      visibleMeals: newVisibleItems,
      hasMore: newVisibleItems.length < meals.length
    });
  }
  
  handleQuantityChange(mealId, value) {
    this.setState(prevState => ({
      quantities: {
        ...prevState.quantities,
        [mealId]: parseInt(value, 10)
      }
    }));
  }
  
  handleAddToCart(e, meal) {
    e.preventDefault();
    const quantity = this.state.quantities[meal.id];
    
    this.props.addToCart(meal, quantity);
    
    this.setState(prevState => ({
      quantities: {
        ...prevState.quantities,
        [meal.id]: 1
      }
    }));
  }
  
  handleCategoryClick(e) {
    e.preventDefault();
  }
  
  render() {
    const { loading, visibleMeals, quantities, hasMore } = this.state;
    
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    
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
                <a data-w-tab="Desert" onClick={this.handleCategoryClick} className="tab-link-round w-inline-block w-tab-link w--current" id="w-tabs-0-data-w-tab-0" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-0" aria-selected="true">
                  <div>Dessert</div>
                </a>
                <a data-w-tab="Dinner" onClick={this.handleCategoryClick} className="tab-link-round w-inline-block w-tab-link" tabIndex="-1" id="w-tabs-0-data-w-tab-1" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-1" aria-selected="false">
                  <div>Dinner</div>
                </a>
                <a data-w-tab="Breakfast" onClick={this.handleCategoryClick} className="tab-link-round w-inline-block w-tab-link" tabIndex="-1" id="w-tabs-0-data-w-tab-2" href="#" role="tab" aria-controls="w-tabs-0-data-w-pane-2" aria-selected="false">
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
                      
                      {visibleMeals.map((meal) => (
                        <div key={meal.id} role="listitem" className="menu-item w-dyn-item w-col w-col-6">
                          <div className="food-card">
                            <Link to={`/product/${meal.id}`} className="food-image-square w-inline-block">
                              <img alt={meal.meal} src={meal.img} className="food-image" />
                            </Link>
                            <div className="food-card-content">
                              <Link to={`/product/${meal.id}`} className="food-title-wrap w-inline-block">
                                <h6>{meal.meal}</h6>
                                <div className="price">$&nbsp;{meal.price.toFixed(2)}&nbsp;USD</div>
                              </Link>
                              <p className="paragraph">{meal.category} - {meal.area}</p>
                              <div className="add-to-cart">
                                <form className="w-commerce-commerceaddtocartform default-state" onSubmit={(e) => this.handleAddToCart(e, meal)}>
                                  <input 
                                    type="number" 
                                    pattern="^[0-9]+$" 
                                    inputMode="numeric" 
                                    min="1" 
                                    className="w-commerce-commerceaddtocartquantityinput quantity" 
                                    value={quantities[meal.id]} 
                                    onChange={(e) => this.handleQuantityChange(meal.id, e.target.value)}
                                  />
                                  <input type="submit" className="w-commerce-commerceaddtocartbutton order-button" value="Add to Cart" />
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                    </div>
                    {hasMore && (
                      <div role="navigation" aria-label="List" className="w-pagination-wrapper pagination">
                        <a href="#" onClick={this.loadMoreItems} aria-label="Next Page" className="w-pagination-next pagination-button">
                          <div className="w-inline-block">See more</div>
                          <svg className="w-pagination-next-icon" height="12px" width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
                            <path fill="none" stroke="currentColor" fillRule="evenodd" d="M4 2l4 4-4 4"></path>
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function Menu() {
  const { addToCart } = useCart();
  return <MenuClass addToCart={addToCart} />;
}

export default Menu; 