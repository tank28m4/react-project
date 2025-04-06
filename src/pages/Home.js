import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  
  useEffect(() => {
    document.title = "Home";
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


  return (
    <>
      <Header />
<div id="Header" className="header">                                 
     
      </div>
      
      <Footer />
    </>
  );
}

export default Home; 