import React, { useEffect, useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import { ToastContainer, toast } from 'react-toastify';
import { BASE_URL, Delay, FetchData, PostData } from '../../../appService/Delay';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const AddBlog = () => {
  const history=useHistory();
  const [formData, setFormData] = useState({
title: '',
   body: '',
  });


  const handleSubmit = async (event) => {
    try{
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`${BASE_URL}/blogs/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':`Bearer ${token}`
            }
            
          });
    if (response.status === 201) {
     
        toast.success('Images added successfully');
        await Delay(1000);
        history.push('/admin/blogs');
      } else {
        toast.error('Failed to add images');
      }
    }catch{
        toast.error('Failed to add images');
    }

  };

  

  const propertyFields = [
    { name: 'title', label: 'Blog Title', type: 'text', required: true },
    { name: 'body', label: 'Blog Body', type: 'text', 
      required: true },
    { name: 'image', label: 'Blog Image', type: 'file', required: true },
  ];

  return (
    <>
   
        <GenericForm
          fields={propertyFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          title={'Add Property'}
        />
      <ToastContainer />
    </>
  );
};

export default AddBlog;
