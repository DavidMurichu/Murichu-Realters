import React, { useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import ApiService from '../../../appService/data/PostData';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL, Delay } from '../../../appService/Delay';
import { Typography } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { showToast } from '../../../appService/Toast/Toast';
import axios from 'axios';

const AddPropertyImageForm = ({ data }) => {
  const [formData, setFormData] = useState({
    property: parseInt(data.id),
    images: null
  });
  const history = useHistory();

  const handleSubmit = async (event) => {
    console.log('formData', formData);
    const token = localStorage.getItem('access_token');
    console.log('token', token)
    const response = await axios.post(`${BASE_URL}/property-images/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization':`Bearer ${token}`
      }
      
    });
    console.log('response', response);
    if (response.status === 201) {
     
      toast.success('Images added successfully');
      await Delay(1000);
      history.push('/admin/manage-property');
    } else {
      toast.error('Failed to add images');
    }
  };

  const imageFields = [
    { name: 'images', label: 'Property Images', type: 'files', required: true }
  ];

  return (
    <>
      <Typography variant="h6">
        Add images for {data.property_name}
      </Typography>
      <GenericForm
        fields={imageFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={'Add Images'}
      />
     
    </>
  );
};

export default AddPropertyImageForm;
