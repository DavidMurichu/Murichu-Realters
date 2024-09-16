

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Maincard from '../../Layouts/maincard';
import RecentCardCustom from '../../../Container/RecentCardCustom';
import { BASE_URL, FetchData } from '../../../appService/Delay';
import axios from 'axios';
import { showToast } from '../../../appService/Toast/Toast';
import { useLoading } from '../../../appService/Loading';
import ApiService from '../../../appService/data/PostData';


function PropertyManagement() {

    const [properties, setProperties]=useState([]);
    const {showLoading, hideLoading}=useLoading();


    const fetch=async()=>{
        await FetchData('get-properties', setProperties, showLoading, hideLoading);
    }
    useEffect(
        ()=>{
            fetch()
        }, []
    )

    const handleDelete = async (id) => {
      const Delete= await ApiService.delete('properties', id);
      if(Delete){
        setProperties((prevItems) => prevItems.filter((item) => item.id !== id));
      }
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
        </Maincard>
       
        </>
        
    );
}

export default PropertyManagement;
