import React, { useContext, useState, useEffect } from 'react';
import { CoinContext } from '../../Context/CoinContext';
import { Link } from 'react-router-dom';
import './Home.css'; // Your existing styles

const Home = () => {
  const { allCoins,setCurrency,currency } = useContext(CoinContext);

  const [filteredCoins, setFilteredCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const coinsPerPage = 10;

  useEffect(() => {
    setFilteredCoins(allCoins);
  }, [allCoins]);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(query)
    );
    setFilteredCoins(filtered);
    setCurrentPage(1); // Reset to first page
  };

  // Handle Sort
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedCoins = [...filteredCoins];
    if (option === 'priceAsc') {
      sortedCoins.sort((a, b) => a.current_price - b.current_price);
    } else if (option === 'priceDesc') {
      sortedCoins.sort((a, b) => b.current_price - a.current_price);
    } else if (option === 'marketCapAsc') {
      sortedCoins.sort((a, b) => a.market_cap - b.market_cap);
    } else if (option === 'marketCapDesc') {
      sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
    }
    setFilteredCoins(sortedCoins);
  };

  // Pagination Logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div className="home-container">
      {/* Search and Sort Controls */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <select
          value={sortOption}
          onChange={handleSort}
          className="sort-dropdown"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="marketCapAsc">Market Cap: Low to High</option>
          <option value="marketCapDesc">Market Cap: High to Low</option>
        </select>
      </div>

      {/* Display Coins */}
      <div className="coins-list">
        {currentCoins.map((coin) => (
          <div className="coin-card" key={coin.id}>
            <Link to={`/coin/${coin.id}`}>
              <img src={coin.image} alt={coin.name} className="coin-image" />
              <h3>{coin.name}</h3>
              <p>Price:{currency.symbol} {coin.current_price.toLocaleString()}</p>
              <p>Market Cap:{currency.symbol} {coin.market_cap.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
