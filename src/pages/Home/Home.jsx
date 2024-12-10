import React, { useContext, useEffect,useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Context/CoinContext'

const Home = () => {

    const { allCoins,currency } = useContext(CoinContext);
    const [displayCoin,setDisplayCoin] = useState([]);
    const [input,setInput] = useState('');

    const inputHandler = (e) => {
      setInput(e.target.value);
      if(e.target.value ===''){
        setDisplayCoin(allCoins);
      }
    };
   
    const searchHandler = (e) => {
      e.preventDefault();
      const filteredCoins = allCoins.filter((coin) =>
        coin.name.toLowerCase().includes(input.toLowerCase())
      );
      setDisplayCoin(filteredCoins);
    }

    useEffect(() => {   
      setDisplayCoin(allCoins);
    }, [allCoins]);
      

  return (
    
    <div className='home'>
      <div className='main'>

    <h1>Largest<br/>Crypto Marketplace</h1>
    <p>Welcome to the world's largest crypto marketplace</p>
    <form onSubmit={searchHandler}>

    <input type='text' onChange={inputHandler} list='coinList' value={input} placeholder='Search for crypto' required/>
    <button>Search</button>

    <datalist id='coinList'>
       {allCoins.map((coin) => (
         <option key={coin.id} value={coin.name} />
       ))}
    </datalist>

    </form>

    </div>
    <div className="crpto-table">
       <div className="table-layout">
    <p>#</p>
    <p className='coin'>Coins</p>

    <p>Price</p>
    <p>24hChange</p>
    <p>MarketCap</p>
  </div>
  {
    displayCoin.slice(0,10).map((item,index)=>{
      return <div className="table-layout" key={item.id}>
        <p>{item.market_cap_rank  }</p>
        <div>
          <img src={item.image} alt="" />
          <p>{item.name} </p>
          </div>
          <p> {currency.symbol} {item.current_price.toLocaleString()} </p>
          {/* <p>{item.price_change_percentage_24h} %</p> */}
          <p className={item.price_change_percentage_24h > 0 ? 'green' : 'red'}>
            {Math.floor(item.price_change_percentage_24h*100)/100} </p>
          <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

        </div>
    })

  }


    </div>

    </div>

  )
}

export default Home