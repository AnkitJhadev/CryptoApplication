import React, { useContext } from 'react';
import './Nav.css';
import logo from '../../src/assets/logo.png';
import arrow from "../../src/assets/arrow_icon.png";
import { CoinContext } from '../context/CoinContext'; // Import context

const Nav = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    switch (selectedCurrency) {
      case 'usd':
        setCurrency({ name: 'usd', symbol: '$' });
        break;
      case 'eur':
        setCurrency({ name: 'eur', symbol: '€' });
        break;
      case 'inr':
        setCurrency({ name: 'inr', symbol: '₹' });
        break;
      default:
        setCurrency({ name: 'usd', symbol: '$' }); // Fallback to USD
        break;
    }
  };

  return (
    <div className='nav'>
      <img src={logo} alt='logo' />
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Features</li>
      </ul>
      <div className='nav-right'>
        <select onChange={handleCurrencyChange}>
          <option value='usd'>USD</option>
          <option value='eur'>EUR</option>
          <option value='inr'>INR</option>
        </select>
        <button>
          Sign Up
          <img src={arrow} alt='arrow' />
        </button>
      </div>
    </div>
  );
};

export default Nav;
