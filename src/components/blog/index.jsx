import { Grid } from "@mui/material"
import Back from "../common/Back"

import img from "../images/services.jpg"
import BlogCard from "./BlogCard"
import { useEffect, useState } from "react"
import { FetchData } from "../appService/Delay"

const Blog=()=>{
    const [blogs, setBlogs]=useState([]);
    const [loading, setLoading]=useState(false)
    const getBlogs=async()=>{
         await FetchData('blogs', setBlogs, setLoading);
    }
    useEffect(()=>{
        getBlogs()
    }, []);

    return(
        <Grid style={{ maxWidth: '100%' }}>
        <Back 
        name='Blogs'
        title='Explain our top properties'
        cover={img}
        />
        <BlogCard
        list={blogs}
        />
        </Grid>
    )
}

export default Blog