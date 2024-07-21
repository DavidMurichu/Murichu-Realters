

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Maincard from '../../Layouts/maincard';
import { images, list, propertyData } from '../../../data/Data';
import RecentCardCustom from '../../../Container/RecentCardCustom';
import RecentCard from '../../../home/recent/RecentCard';
import ImageViewer from '../../../Container/ImageCard';
import PropertyInformationPage from '../../../Container/propertyCard';
import { BASE_URL, FetchData } from '../../../appService/Delay';
import axios from 'axios';
import { showToast } from '../../../appService/Toast/Toast';


const columns = [
    { field: 'studentid', headerName: 'Pupils' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'amount', headerName: 'Amount' },
    { field: 'invoicedon', headerName: 'Invoice Date' },
    { field: 'documentno', headerName: 'Document No' },
    { field: 'remarks', headerName: 'Remarks' },
    { field: 'created_at', headerName: 'Created At' }
];

function PropertyManagement() {

    const [properties, setProperties]=useState([]);
    const [loading, setLoading]=useState(false);

    const fetch=async()=>{
        await FetchData('get-properties', setProperties, setLoading);
    }
    useEffect(
        ()=>{
            fetch()
        }, []
    )

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/properties/${id}/`, {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            },
          });
    
          if (response.status === 204) {
            showToast('Image deleted successfully', 'success');
            setProperties((prevItems) => prevItems.filter((item) => item.id !== id));
          } else {
            showToast('Failed to delete image', 'error');
          }
        } catch (error) {
          showToast('Error deleting image', 'error');
          console.error('Error deleting image:', error);
        }
      };

    const property = {
        id: 1,
        property_name: 'Property 1',
        property_city: 'Nairobi',
        property_address: '123 Luthuri Avenue',
        property_price: 20000.0,
        property_tenure: 'sale',
        property_type: 'Apartment',
        property_bedrooms: 4,
        property_images: {
          images: [
            '../images/list/p-4.png',
            '../images/list/p-5.png',
          ],
        },
        property_description: 'This is a beautiful apartment located in the heart of Nairobi, featuring modern amenities and a spacious living area.'
      };
    return (
        <>
        <Maincard title="Property Management">
            <Typography variant="body1" gutterBottom>
                Welcome to the Property Management page. Here you can manage properties details and their actions.
            </Typography>

            {/* Button for adding new arrear */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/admin/add-property"
                sx={{ mr: 1 }}
            >
                Add property
            </Button>
           <RecentCardCustom 
           handleDelete={handleDelete}
           list={properties} />
           {/* <ImageViewer list={images} /> */}
        </Maincard>
       
        </>
        
    );
}

export default PropertyManagement;
