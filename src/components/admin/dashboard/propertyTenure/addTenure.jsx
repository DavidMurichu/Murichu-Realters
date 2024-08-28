import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import GenericForm from '../../Layouts/formlayout';
import { ToastContainer, toast } from 'react-toastify';
import { Delay } from '../../../appService/Delay';
import ApiService from '../../../appService/data/PostData';
import { useHistory } from 'react-router-dom';


const AddPropertyTenureForm = () => {
  const history=useHistory();
  const [formData, setFormData]=useState({
    name:'',
    description:''
   
  });

  const handleSubmit = async(event) => {
    
    console.log('formData', formData);
    const response=await ApiService.post('property-tenures', formData);
    console.log('response',response);
    if (response.status===201){
      toast.success('added successfully');
      await Delay(1000);
      history.push('/admin/property-tenures');
    }
    // Handle form submission logic here
  };
  

  const propertyFields=[

    { name: 'name', label: 'Property Tenure', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: true },
   

]

  return (
  
     <>
        <GenericForm
        fields={propertyFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={'Add Tenure'}
        />
        <ToastContainer />

     </>
        
    

   
  );
};

export default AddPropertyTenureForm;
