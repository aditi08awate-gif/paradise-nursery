import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button
            className="get-started-button"
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
