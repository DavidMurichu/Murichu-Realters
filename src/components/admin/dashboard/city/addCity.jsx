import React, { useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import ApiService from '../../../appService/data/PostData';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Delay } from '../../../appService/Delay';



const AddCityForm = () => {
  const [formData, setFormData]=useState({
   
   city:''
  });
  const history=useHistory();


  const handleSubmit = async(event) => {
    
    console.log('formData', formData);
    const response=await ApiService.post('locations', formData);
    console.log('response',response);
    if (response.status===201){
      toast.success('added successfully');
      await Delay(1000);
      history.push('/admin/city');
    }
    // Handle form submission logic here
  };

  const cityFields=[
    { name: 'city', label: 'City Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text' },
]

  return (
  <>
     <GenericForm
        fields={cityFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        title={'Add New City'}
        />
            <ToastContainer />

  </>
       
   
  );
};

export default AddCityForm;
