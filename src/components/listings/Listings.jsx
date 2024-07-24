import React, { useEffect, useState } from "react";
import RecentCardCustom from "../Container/RecentCardCustom";
import "../home/recent/recent.css";
import AdvancedFilter from "../filter/AdvanceFilter";
import { FetchData } from "../appService/Delay";
import SingleCard from "../Container/SingleCardGrid";

const Listings = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    await FetchData('get-properties', setPropertyData, setLoading);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section className='blog-out mb' style={{ maxWidth: '100%' }}>
      <AdvancedFilter data={propertyData} onFilterUpdate={setFilteredList} />
      <div className='container recent'>
        
        <RecentCardCustom list={filteredList} />
      </div>
    </section>

  );
}

export default Listings;
