import { createContext } from "react";

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {

    const contextValue ={


    }

    return  <CoinContext.Provider value={contextValue}>
        
        {children}
        
        
        </CoinContext.Provider>;
};