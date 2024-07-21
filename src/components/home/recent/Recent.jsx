import React, { useEffect, useState } from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"
import { list, propertyData, recent } from "../../data/Data"
import { Link } from "react-router-dom"
import RecentCardCustom from "../../Container/RecentCardCustom"
import { FetchData } from "../../appService/Delay"




const Recent = () => {
  const [data, setData]=useState([])
  const [loading, setLoading]=useState(false)

  const fetch=async()=>{
    await FetchData('get-properties', setData, setLoading);
  }

  useEffect(
    ()=>{
      fetch()
    },
    []
  )
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
        <Heading 
  title='Recent Property Listed' 
  subtitle='Discover our latest properties, meticulously selected to meet your needs and lifestyle. Explore now and find your perfect home.' 
/>

          <RecentCardCustom list={data.slice(0,6)} />
          
          <button className='btn1 float-right'>
          <Link to='/listings'>
            <i className='fa'></i> More Properties
          </Link>
        </button>
        </div>
      </section>
    </>
  )
}

export default Recent
