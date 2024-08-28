import React, { createContext, useEffect, useState } from 'react';
import { FetchData } from './Delay';

const TenureContext = createContext();

const TenureProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tenures, setTenures] = useState([]);
  const [propertyTenure, setPropertyTenure] = useState('');
  const [location, setLocation] = useState('');

  const fetch = async () => {
    await FetchData('property-tenures', setTenures, setLoading);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <TenureContext.Provider value={{ propertyTenure, setPropertyTenure, location, setLocation, tenures }}>
      {children}
    </TenureContext.Provider>
  );
};

export { TenureContext, TenureProvider };
