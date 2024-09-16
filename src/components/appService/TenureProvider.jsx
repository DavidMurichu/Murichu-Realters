import React, { createContext, useEffect, useState } from 'react';
import { FetchData } from './Delay';
import { useLoading } from './Loading';

const TenureContext = createContext();

const TenureProvider = ({ children }) => {
  const {showLoading, hideLoading}=useLoading();
  const [tenures, setTenures] = useState([]);
  const [propertyTenure, setPropertyTenure] = useState('');
  const [location, setLocation] = useState('');

  const fetch = async () => {
    await FetchData('property-tenures', setTenures, showLoading, hideLoading);
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
