import React, { useEffect, useState } from "react";
import RecentCardCustom from "../Container/RecentCardCustom";
import "../home/recent/recent.css";
import AdvancedFilter from "../filter/AdvanceFilter";
import { FetchData } from "../appService/Delay";
import { useLoading } from "../appService/Loading";




const Listings = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const {showLoading, hideLoading}=useLoading();
  

  const fetch = async () => {
    await FetchData('get-properties', setPropertyData, showLoading, hideLoading);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className='blog-out mb' style={{ maxWidth: '100%' }}>
       <div className='container recent'>
       <AdvancedFilter data={propertyData} onFilterUpdate={setFilteredList} />

       </div>
      <div className='container recent'>
        <RecentCardCustom list={filteredList} />
      </div>
    </section>

  );
}

export default Listings;
