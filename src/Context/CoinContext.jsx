import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;


export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  // console.log(process.env.REACT_APP_COINGECKO_API_KEY);

  const fetchAllCoins = async () => {
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
