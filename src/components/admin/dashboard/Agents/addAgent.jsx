import React, { useEffect, useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL, Delay, FetchData } from '../../../appService/Delay';
import ApiService from '../../../appService/data/PostData';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddAgentForm = () => {
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    profile_image: null,
  });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        await FetchData('locations', setCities, setLoading);
      } catch (error) {
        console.error('Error fetching cities:', error);
        // Handle error gracefully, e.g., show a toast or fallback mechanism
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async (event) => {
    
    console.log('formData', formData);

    try {
      const response = await axios.post(`${BASE_URL}/agents/`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });
     if(response.status==201){
      toast.success('agent added successfully');
      await Delay(1000);
      history.push('/admin/agents')
     }else{
      toast.error('Contact admin');
     }

      console.log('Success:', response.data);
  } catch (error) {
    if (error.response && error.response.data) {
      const errors = error.response.data;
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errors[key].forEach((message) => {
            toast.error(`${key}: ${message}`);
          });
        }
      }
    } else {
      toast.error('Failed to add agent');
    }
      console.error('Error:', error);
  }

    // try {
    //   const response = await ApiService.post('agents', formData, {
    //     'Content-Type': 'multipart/form-data',
    //   });
    //   console.log('response', response);
    //   if (response.status === 201) {
    //     toast.success('Agent added successfully');
    //     await Delay(1000);
    //     history.push('/admin/agents');
    //   } else {
    //     toast.error('Failed to add agent');
    //   }
    // } catch (error) {
    //   console.error('Error adding agent:', error);
    //   toast.error('Failed to add agent');
    // } finally {
    //   // Clear form or handle post-submission state if needed
    // }
  };

  const cityFields = [
    { name: 'name', label: 'Agent Name', type: 'text', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
      name: 'city',
      label: 'Location',
      type: 'select',
      required: true,
      options: cities.map((location) => ({ value: location.id, label: location.city })),
    },
    { name: 'profile_image', label: 'Profile Image', type: 'file', required: true }
    

  ];

  return (
    <>
      <GenericForm
        fields={cityFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={'Add New Agent'}
      />
      <ToastContainer />
    </>
  );
};

export default AddAgentForm;
