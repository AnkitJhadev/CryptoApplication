import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import './Coin.css';

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

const getCachedData = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
    return data;
  }

  return null;
};

const setCachedData = (key, data) => {
  const cacheEntry = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
};

const Coin = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const cacheKey = `coinData_${id}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setData(cachedData);
      return;
    }

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-J5EVTqkhhVwvzsyaqLWDBcKx',
        },
      });
      const result = await res.json();
      setData(result);
      setCachedData(cacheKey, result);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoricalData = async () => {
    const cacheKey = `historicalData_${id}_${currency.name}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setHistoricalData(cachedData);
      return;
    }

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-J5EVTqkhhVwvzsyaqLWDBcKx',
          },
        }
      );
      const result = await res.json();
      setHistoricalData(result);
      setCachedData(cacheKey, result);
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
      <div className="coin-info">
        <div className="coin-image">
          <img src={data.image.large} alt={data.name} />
        </div>
        <div className="coin-details">
          <h2>
            {data.name} ({data.symbol.toUpperCase()})
          </h2>
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
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Coin;
