import React from 'react'
import './Home.css'

const Home = () => {
  return (
    
    <div className='home'>
<div className='main'>

    <h1>Largest<br/>Crypto Marketplace</h1>
    <p>Welcome to the world's largest crypto marketplace</p>
    <form>

    <input type='text' placeholder='Search for crypto'/>

    </form>

    <button>Search</button>
    </div>
    <div className="crpto-table">
       <div className="table-layout">
    <p>#</p>
    <p>Coins</p>

    <p>Name</p>
    <p>Price</p>
    <p>24hChange</p>
    <p>MarketCap</p>



       </div>


    </div>

    </div>

  )
}

export default Home