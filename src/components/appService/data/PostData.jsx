import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../Delay';



class ApiService{

    static async post(endpoint, data, requiresAuth = false, headers={}) {
        try {
           
            const token = localStorage.getItem('access_token');
                console.log('token', token);
            if (requiresAuth) {
                
                headers['Authorization'] = `Bearer ${token}`;
            }
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

   
        static async fetchData(endpointPath, setData, setLoading){
            try {
                const response = await axios.get(`${BASE_URL}/${endpointPath}`);
                setData(response.data);
                setLoading(false)
              } catch (error) {
                console.error('Error fetching data:', error);
                setData([]); // Clear data on error
              } finally {
                setLoading(false);
              }
          };
          
}

export default ApiService