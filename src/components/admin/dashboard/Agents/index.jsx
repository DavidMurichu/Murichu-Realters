import React, { useEffect, useState } from "react"
import "../../../home/recent/recent.css"
import { propertyData } from "../../../data/Data"
import AdvancedFilter from "../../../filter/AdvanceFilter"
import RecentCardCustom from "../../../Container/RecentCardCustom"
import { ToastContainer } from "react-toastify"
import { FetchData } from "../../../appService/Delay"
import AgentCardCustom from "../../../Container/AgentsCard"
import { Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"


const Agents = () => {
  const [loading, setLoading]=useState(false);
  const [filteredList, setFilteredList] = useState(propertyData);
  useEffect(()=>{
    const fetch=async()=>{
      await FetchData('get-agents', setFilteredList, setLoading);
    }
    fetch()
  }, [])
  console.log('get-agents', filteredList);
  
  return (
    <>
      <section className='blog-out mb' style={{maxWidth:'100%'}}>
        {/* <Back name='Blog' title='Blog Grid - Our Blogs' cover={img} /> */}
        <Typography variant="body1" gutterBottom>
        Welcome to the Agent Management page. Here you can manage Agents and their actions.
      </Typography>

      {/* Button for adding new city */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/admin/add-agents"
        sx={{ mr: 1 }}
      >
        Add Agent
      </Button>
        <div className='container recent'>

          <AgentCardCustom list={filteredList}/>
        </div>
        <ToastContainer />
      </section>
    </>
  )


}

export default Agents
