import React from 'react';
import img from '../assets/images/logo.png';

const Header = () => {
  return (
    <header id="heading">
      <div className="logo">
        <img src={img} alt="Messenger" />
      </div>
    </header>
  );
};

export default Header;
