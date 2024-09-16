import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL, token } from '../Delay';
import { showToast } from '../Toast/Toast';



class ApiService{

    static async post(endpoint, data, headers={}) {
        try {
           
            const token = localStorage.getItem('access_token');
                headers['Authorization'] = `Bearer ${token}`;
            
            // data.createdby=sessionStorage.getItem('id');
            // data.createdby=1;
            // data.lasteditedby=createdby;
            const response = await axios.post(`${BASE_URL}/${endpoint}/`, data, {
                headers,
            });
            return response;
        } catch (error) {
            console.error(`POST request failed: ${error.message}`);
            return error;
        }
    }

        static async delete(endpointPath, id, refresh, setRefresh){
            try {
                const response = await axios.delete(`${BASE_URL}/${endpointPath}/${id}/`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                  },
                });
          
                if (response.status === 204) {
                  showToast(' Deleted successfully', 'success');
                  return true
                } else {
                  showToast(' Delete Failed', 'error');
                  return false
                }
              } catch (error) {
                showToast('Error deleting ', 'error');
                return false
              }
        }
          
}

export default ApiService