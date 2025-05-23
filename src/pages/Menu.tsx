import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import PhoneTooltip from '../components/PhoneTooltip';
import useFetch from '../hooks/useFetch';
import './Menu.css';

import burgerDreams from '../assets/images/burger-dreams.png';
import burgerWaldo from '../assets/images/burger-waldo.png';
import burgerCali from '../assets/images/burger-cali.png';
import burgerBaconBuddy from '../assets/images/burger-bacon-buddy.png';
import burgerSpicy from '../assets/images/burger-spicy.png';
import burgerClassic from '../assets/images/burger-classic.png';

interface Meal {
  id: string;
  meal: string;
  price: number;
  category: string;
  area: string;
  img: string;
  [key: string]: any;
}

interface Quantities {
  [key: string]: number;
}

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const { fetch: fetchWithLogger } = useFetch();
  const [loading, setLoading] = useState<boolean>(true);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [visibleMeals, setVisibleMeals] = useState<Meal[]>([]);
  const [quantities, setQuantities] = useState<Quantities>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(6);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('Dessert');
  
  useEffect(() => {
    document.title = "Menu";
    fetchMeals();
  }, []);
  
  useEffect(() => {
    if (meals.length > 0) {
      const filteredMeals = meals.filter(meal => meal.category === category);
      setVisibleMeals(filteredMeals.slice(0, currentPage * itemsPerPage));
      setHasMore(filteredMeals.length > currentPage * itemsPerPage);
    }
  }, [category, meals, currentPage, itemsPerPage]);
  
  const fetchMeals = async (): Promise<void> => {
    try {
      const response = await fetchWithLogger<Meal[]>('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
      const data = response.data;
      
      const newQuantities: Quantities = {};
      
      data.forEach(meal => {
        newQuantities[meal.id] = 1;
      });
      
      setMeals(data);
      const filteredMeals = data.filter(meal => meal.category === category);
      setVisibleMeals(filteredMeals.slice(0, itemsPerPage));
      setQuantities(newQuantities);
      setLoading(false);
      setHasMore(filteredMeals.length > itemsPerPage);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setLoading(false);
    }
  };

  const loadMoreItems = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  const handleQuantityChange = (mealId: string, value: string): void => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [mealId]: parseInt(value, 10)
    }));
  };
  
  const handleAddToCart = (e: FormEvent<HTMLFormElement>, meal: Meal): void => {
    e.preventDefault();
    const quantity = quantities[meal.id];
    
    addToCart(meal, quantity);
    
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [meal.id]: 1
    }));
  };
  
  const handleCategoryClick = (e: MouseEvent<HTMLAnchorElement>, newCategory: string): void => {
    e.preventDefault();
    setCategory(newCategory);
    setCurrentPage(1);
  };
  
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
              <a 
                data-w-tab="Dessert" 
                onClick={(e) => handleCategoryClick(e, 'Dessert')} 
                className={`tab-link-round w-inline-block w-tab-link ${category === 'Dessert' ? 'w--current' : ''}`} 
                id="w-tabs-0-data-w-tab-0" 
                href="#" 
                role="tab" 
                aria-controls="w-tabs-0-data-w-pane-0" 
                aria-selected={category === 'Dessert'}
              >
                <div>Dessert</div>
              </a>
              <a 
                data-w-tab="Dinner" 
                onClick={(e) => handleCategoryClick(e, 'Dinner')} 
                className={`tab-link-round w-inline-block w-tab-link ${category === 'Dinner' ? 'w--current' : ''}`} 
                tabIndex={-1} 
                id="w-tabs-0-data-w-tab-1" 
                href="#" 
                role="tab" 
                aria-controls="w-tabs-0-data-w-pane-1" 
                aria-selected={category === 'Dinner'}
              >
                <div>Dinner</div>
              </a>
              <a 
                data-w-tab="Breakfast" 
                onClick={(e) => handleCategoryClick(e, 'Breakfast')} 
                className={`tab-link-round w-inline-block w-tab-link ${category === 'Breakfast' ? 'w--current' : ''}`} 
                tabIndex={-1} 
                id="w-tabs-0-data-w-tab-2" 
                href="#" 
                role="tab" 
                aria-controls="w-tabs-0-data-w-pane-2" 
                aria-selected={category === 'Breakfast'}
              >
                <div>Breakfast</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-section">
        <div className="container">
          <div data-duration-in="300" data-duration-out="100" data-current={category} data-easing="ease" className="w-tabs">
            <div className="w-tab-content">
              <div data-w-tab={category} className="tab-pane-wrap w-tab-pane w--tab-active" id={`w-tabs-0-data-w-pane-${category === 'Dessert' ? '0' : category === 'Dinner' ? '1' : '2'}`} role="tabpanel" aria-labelledby={`w-tabs-0-data-w-tab-${category === 'Dessert' ? '0' : category === 'Dinner' ? '1' : '2'}`}>
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
                              <form className="w-commerce-commerceaddtocartform default-state" onSubmit={(e) => handleAddToCart(e, meal)}>
                                <input 
                                  type="number" 
                                  pattern="^[0-9]+$" 
                                  inputMode="numeric" 
                                  min="1" 
                                  className="w-commerce-commerceaddtocartquantityinput quantity" 
                                  value={quantities[meal.id]} 
                                  onChange={(e) => handleQuantityChange(meal.id, e.target.value)}
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
                      <a href="#" onClick={loadMoreItems} aria-label="Next Page" className="w-pagination-next pagination-button">
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
};

export default Menu; 