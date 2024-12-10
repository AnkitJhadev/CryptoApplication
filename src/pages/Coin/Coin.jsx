import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../Context/CoinContext';

const Coin = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [currency]);

  return (
    <div className="coin">
      {loading ? (
        <div className="spinner">
          <div className="loader"></div>
        </div>
      ) : data ? (
        <div className="coin-name">
          <img src={data.image.large} alt={data.name} />
          <p>
            <b>
              {data.name} ({data.symbol})
            </b>
          </p>
        </div>
      ) : (
        <div className="error-message">
          <p>Failed to load coin data. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Coin;
