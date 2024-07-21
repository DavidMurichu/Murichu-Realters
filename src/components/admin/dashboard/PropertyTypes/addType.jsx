import React, { useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import { ToastContainer, toast } from 'react-toastify';
import ApiService from '../../../appService/data/PostData';
import { Delay } from '../../../appService/Delay';
import { useHistory } from 'react-router-dom';


const AddPropertyTypeForm = () => {
  const history=useHistory();
  const [formData, setFormData]=useState({
   
   city:''
  });


  const handleSubmit = async(event) => {
    
    console.log('formData', formData);
    const response=await ApiService.post('property-types', formData);
    console.log('response',response);
    if (response.status===201){
      toast.success('added successfully');
      await Delay(1000);
      history.push('/admin/property-types');
    }
    // Handle form submission logic here
  };

  const cityFields=[
    { name: 'name', label: 'Property Type', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: false },
]

  return (
    <>
        <GenericForm
        fields={cityFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={'Add New Property Type'}
        />
        <ToastContainer />
    </>
        
   
  );
};

export default AddPropertyTypeForm;
