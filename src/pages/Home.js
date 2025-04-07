import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="home-container">
    </div>
  );
}

export default Home; 