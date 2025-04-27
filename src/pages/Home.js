import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  
  return (
    <div className="home-container">
    </div>
  );
};

export default Home; 