import React, { createContext, useState } from 'react';

const TenureContext = createContext();

const TenureProvider = ({ children }) => {
  const [propertyTenure, setPropertyTenure] = useState('');
  const [location, setLocation] = useState('');

  return (
    <TenureContext.Provider value={{ propertyTenure, setPropertyTenure, location, setLocation }}>
      {children}
    </TenureContext.Provider>
  );
};

export { TenureContext, TenureProvider };
