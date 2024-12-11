import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import './Coin.css'; // Import CSS for styling

const Coin = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-J5EVTqkhhVwvzsyaqLWDBcKx',
      },
    };

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-J5EVTqkhhVwvzsyaqLWDBcKx',
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      const result = await res.json();
      setHistoricalData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCoinData(), fetchHistoricalData()]);
      setLoading(false);
    };

    fetchData();
  }, [currency]);

  if (loading) {
    return (
      <div className="spinner">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data || !historicalData) {
    return (
      <div className="error-message">
        <p>Failed to load coin data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="coin-container">
      {/* Left Section: Coin Info */}
      <div className="coin-info">
        <div className="coin-image">
          <img src={data.image.large} alt={data.name} />
    
        </div>
        <div className="coin-details">
          <h2>{data.name} ({data.symbol.toUpperCase()})</h2>
          <p>Rank: {data.market_cap_rank}</p>
          <p>
            Current Price: {currency.symbol}
            {data.market_data.current_price[currency.name].toLocaleString()}
          </p>
          <p>
            Market Cap: {currency.symbol}
            {data.market_data.market_cap[currency.name].toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right Section: Line Chart */}
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Coin;
