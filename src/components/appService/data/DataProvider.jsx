import React, { createContext, useContext } from 'react';
import useFetchData from './FetchData';


const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { data, loading } = useFetchData('/properties'); // Fetch data here

  return (
    <DataContext.Provider value={{ data, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
