import React from 'react'
import './Nav.css'
import logo from '../../src/assets/logo.png'
import arrow from "../../src/assets/arrow_icon.png"

const Nav = () => {
  return (
    <div className='nav'>
        <img src={logo}alt='logo'/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Features</li>
        
        </ul>
         <div className='nav-right'>
            <select>
                <option value = 'usd'>USD</option>
                <option value='eur'>EUR</option> 
                <option value='inr'>INR</option>
            </select>
            <button>Sign Up<img src={arrow} alt='logo'/></button>
         </div>

    </div>
  )
}

export default Nav