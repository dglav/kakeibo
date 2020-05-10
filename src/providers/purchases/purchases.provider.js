import React, { createContext, useState } from "./node_modules/react";

export const PurchasesContext = createContext({
  purchases: [],
});

const PurchasesProvider = ({ children }) => {
  const [purchases, setPurchases] = useState([]);
  return (
    <PurchasesContext.Provider value={{ purchases, setPurchases }}>
      {children}
    </PurchasesContext.Provider>
  );
};

export default PurchasesProvider;
