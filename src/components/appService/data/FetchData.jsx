import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (endpointPath, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}${endpointPath}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpointPath, ...dependencies]);  // Include dependencies for useEffect

  return { data, loading };
};

export default useFetchData;
