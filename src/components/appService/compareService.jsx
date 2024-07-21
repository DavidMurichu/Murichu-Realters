// CompareContext.js
import React, { createContext, useState } from 'react';

const CompareContext = createContext();

const CompareProvider = ({ children }) => {
  const [compare, setCompare] = useState({});

  return (
    <CompareContext.Provider value={{ compare, setCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export { CompareContext, CompareProvider };
