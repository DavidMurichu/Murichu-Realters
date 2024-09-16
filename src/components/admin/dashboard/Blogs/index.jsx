

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ToastContainer} from "react-toastify";
import Maincard from '../../Layouts/maincard';
import {  FetchData } from '../../../appService/Delay';
import BlogCard from '../../../blog/BlogCard';
import { useLoading } from '../../../appService/Loading';
import ApiService from '../../../appService/data/PostData';


function BlogManagement() {

    const [blogs, SetBlogs]=useState([]);
  const {showLoading, hideLoading}=useLoading();
    

    const fetch=async()=>{
        await FetchData('blogs', SetBlogs, showLoading, hideLoading);
    }
    useEffect(
        ()=>{
            fetch()
        }, []
    )

    const handleDelete = async (id) => {
      const Delete= await ApiService.delete('blogs', id);
      if(Delete){
        SetBlogs((prevItems) => prevItems.filter((item) => item.id !== id));
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
