// CoinContext.js
import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoins = async () => {
    const cachedData = localStorage.getItem(`coins_${currency.name}`);
    const cacheExpiry = localStorage.getItem(`coins_${currency.name}_expiry`);
    const now = new Date().getTime();

    if (cachedData && cacheExpiry && now < parseInt(cacheExpiry)) {
      setAllCoins(JSON.parse(cachedData));
      return;
    }

    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": apiKey, // Use environment variable
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch coins.");
      }

      const data = await response.json();
      setAllCoins(data);
      localStorage.setItem(`coins_${currency.name}`, JSON.stringify(data));
      localStorage.setItem(
        `coins_${currency.name}_expiry`,
        (now + 60 * 60 * 1000).toString() // Cache valid for 1 hour
      );
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  const CoinContextValue = {
    allCoins,
    setAllCoins,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={CoinContextValue}>
      {children}
    </CoinContext.Provider>
  );
};

  
