import React, { createContext, useState } from 'react';

const TenureContext = createContext();

const TenureProvider = ({ children }) => {
  const [propertyTenure, setPropertyTenure] = useState('');

  return (
    <TenureContext.Provider value={{ propertyTenure, setPropertyTenure }}>
      {children}
    </TenureContext.Provider>
  );
};

export { TenureContext, TenureProvider };
