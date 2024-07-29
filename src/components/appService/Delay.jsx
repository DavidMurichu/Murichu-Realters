import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = 'https://danilo6789bhh.pythonanywhere.com/api';


export const Delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const FetchData = async (endpointPath, setData, setLoading) => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/${endpointPath}/`);
      setData(Array.isArray(response.data) 
        ? response.data.map(item => ({ ...item, selected: false })) 
        : []
      );
      if(response){
        console.log('response', response);

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.'); // Notify user of error
      setData([]); // Clear data on error
    } finally {
      setLoading(false);
    }
  };

  export const formatPrice = (price) => {
    if (price >= 1_000_000_000) {
      return `${(price / 1_000_000_000).toFixed(1)}B`;
    }
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(1)}M`;
    }
    if (price >= 1_000) {
      return `${(price / 1_000).toFixed(1)}K`;
    }
    return price.toString();
  };