import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    document.title = "Home";
  }
  
  render() {
    return (
      <div className="home-container">
      </div>
    );
  }
}

export default Home; 