

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Maincard from '../../Layouts/maincard';
import RecentCardCustom from '../../../Container/RecentCardCustom';
import { BASE_URL, DeleteData, FetchData } from '../../../appService/Delay';
import axios from 'axios';
import { showToast } from '../../../appService/Toast/Toast';
import BlogCard from '../../../blog/BlogCard';


function BlogManagement() {

    const [blogs, SetBlogs]=useState([]);
    const [loading, setLoading]=useState(false);

    const fetch=async()=>{
        await FetchData('blogs', SetBlogs, setLoading);
    }
    useEffect(
        ()=>{
            fetch()
        }, []
    )

    const handleDelete = async (id) => {
        try {
          const response = await DeleteData('blogs', id)
          console.log('delet blog', response)
          if (response === true) {
            showToast('Deleted successfully', 'success');
            SetBlogs((prevItems) => prevItems.filter((item) => item.id !== id));
          } else {
            showToast('Failed to delete image', 'error');
          }
        } catch (error) {
          showToast('Error deleting image', 'error');
          console.error('Error deleting image:', error);
        }
      };

    
    return (
        <>
        <Maincard title="Blogs Mangement">
            <Typography variant="body1" gutterBottom>
                Welcome to the Blogs Mangement page. Here you can manage blogs details and their actions.
            </Typography>

            {/* Button for adding new arrear */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/admin/add-blog"
                sx={{ mr: 1 }}
            >
                Add Blog
            </Button>
           <BlogCard
           handleDelete={handleDelete} 
           list={blogs} />
        </Maincard>
       <ToastContainer />
        </>
        
    );
}

export default BlogManagement;
