import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://picsum.photos/seed/snakeplant/300/300', description: 'Produces oxygen at night.', cost: 15 },
      { name: 'Spider Plant', image: 'https://picsum.photos/seed/spiderplant/300/300', description: 'Filters formaldehyde and xylene.', cost: 12 },
      { name: 'Peace Lily', image: 'https://picsum.photos/seed/peacelily/300/300', description: 'Removes mold spores and toxins.', cost: 18 },
      { name: 'Boston Fern', image: 'https://picsum.photos/seed/bostonfern/300/300', description: 'Adds humidity and cleans air.', cost: 20 },
      { name: 'Rubber Plant', image: 'https://picsum.photos/seed/rubberplant/300/300', description: 'Absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: 'https://picsum.photos/seed/aloevera/300/300', description: 'Purifies air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://picsum.photos/seed/lavender/300/300', description: 'Calming scent that aids sleep.', cost: 20 },
      { name: 'Jasmine', image: 'https://picsum.photos/seed/jasmine/300/300', description: 'Sweet fragrance, reduces stress.', cost: 18 },
      { name: 'Rosemary', image: 'https://picsum.photos/seed/rosemary/300/300', description: 'Herb used in cooking and aroma.', cost: 15 },
      { name: 'Mint', image: 'https://picsum.photos/seed/mintplant/300/300', description: 'Refreshing leaves for tea.', cost: 12 },
      { name: 'Lemon Balm', image: 'https://picsum.photos/seed/lemonbalm/300/300', description: 'Citrus scent that repels pests.', cost: 14 },
      { name: 'Hyacinth', image: 'https://picsum.photos/seed/hyacinth/300/300', description: 'Fragrant spring flowers.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: 'https://picsum.photos/seed/echeveria/300/300', description: 'Rosette-shaped, easy to grow.', cost: 10 },
      { name: 'Jade Plant', image: 'https://picsum.photos/seed/jadeplant/300/300', description: 'Symbol of good luck.', cost: 13 },
      { name: 'Zebra Haworthia', image: 'https://picsum.photos/seed/haworthia/300/300', description: 'Striped, compact succulent.', cost: 11 },
      { name: 'Barrel Cactus', image: 'https://picsum.photos/seed/barrelcactus/300/300', description: 'Round desert cactus.', cost: 16 },
      { name: 'Bunny Ear Cactus', image: 'https://picsum.photos/seed/bunnycactus/300/300', description: 'Fuzzy pads shaped like ears.', cost: 14 },
      { name: 'Burro\'s Tail', image: 'https://picsum.photos/seed/burrostail/300/300', description: 'Trailing stems for hanging pots.', cost: 19 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const goHome = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const goPlants = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const goCart = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      <nav className="navbar">
        <a href="#home" className="nav-brand" onClick={goHome}>
          Paradise Nursery
        </a>
        <div className="nav-links">
          <a href="#home" onClick={goHome}>Home</a>
          <a href="#plants" onClick={goPlants}>Plants</a>
          <a href="#cart" className="cart-link" onClick={goCart}>
            <span className="cart-icon" aria-label="Shopping cart">🛒</span>
            <span className="cart-count">{totalItems}</span>
            <span>Cart</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid-wrapper">
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
