import React from 'react';
import './Banner.css';

class Banner extends React.Component {
  render() {
    return (
      <div className="banner-container">
        <div className="left-container">
          <img src="./settings.svg" className="settings-icon" alt="Settings Icon" />
          <span className="settings-text">Settings</span>
        </div>
        <div className="center-container">
          <img src="./donut.svg" className="logo-icon logo-left" alt="Left Icon" />
          <h1 className="logo-text">KrispyKopters</h1>
          <img src="./drone.svg" className="logo-icon logo-right" alt="Right Icon" />
        </div>
        <div className="right-container">
          <span className="cart-text">Cart</span>
          <img src="./cart.svg" className="cart-icon" alt="Shopping Cart Icon" />
          
        </div>
      </div>
    );
  }
}

export default Banner;
