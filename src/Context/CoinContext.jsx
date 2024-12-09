import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoins = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.REACT_APP_COINGECKO_API_KEY, // Use environment variable
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
      setAllCoin(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  const CoinContextValue = {
    allCoin,
    setAllCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={CoinContextValue}>
      {children}
    </CoinContext.Provider>
  );
};
