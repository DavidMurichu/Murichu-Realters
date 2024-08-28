import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = 'http://127.0.0.1:8000/api';


export const Delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const PostData= async(endpointPath, data, requiresAuth = false)=>{
  try{
  if(requiresAuth)
    {

    }
    const response=await axios.post(BASE_URL+'/'+endpointPath, data);
    console.log('user Response', response);
    return response

  }catch(error){
    console.log('user Response error', error);
    return error



  }

}
export const DeleteData= async(endpointPath, id)=>{
  try{
  const response= await axios.delete(`${BASE_URL}/${endpointPath}/${id}/`);
  if(response.status===204){
    return true
  }else{
    return false
  }
  }catch(error){
    console.log('Delete error', error);
    return false
  }
}
export const FetchData = async (endpointPath, setData, setLoading) => {
    try {
      if(setLoading){
        setLoading(true);
      }
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
      if(setLoading){
        setLoading(false);
      }
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
    return price;
  };

