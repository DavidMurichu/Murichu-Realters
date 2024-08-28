import React, { useEffect, useState } from "react";
import RecentCardCustom from "../Container/RecentCardCustom";
import "../home/recent/recent.css";
import AdvancedFilter from "../filter/AdvanceFilter";
import { FetchData } from "../appService/Delay";
import SingleCard from "../Container/SingleCardGrid";
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from "@mui/material";
import LoadingSpinner from "../Loader";


const Listings = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    await FetchData('get-properties', setPropertyData, setLoading);
  }

  useEffect(() => {
    fetch();
  }, []);

  if(loading){
    return (
      <LoadingSpinner />
    )
  }


  const StyledTitle = styled(Typography)`
  font-size: 1.5rem; /* Adjust the font size */
  font-weight: 700; /* Make the text bold */
  color: black; /* Dark grey color for better readability */
  margin-bottom: 1rem; /* Add space below the text */
  text-align: center; /* Center align the text */
 
`;

  return (
    <section className='blog-out mb' style={{ maxWidth: '100%' }}>
       <div className='container recent'>
       <AdvancedFilter data={propertyData} onFilterUpdate={setFilteredList} />

       </div>
      <div className='container recent'>
        {!loading 
        &&
        <RecentCardCustom list={filteredList} />
        }
      </div>
      {/* {propertyData.length!==0&&
       <Box className='footerContact' justifyContent='center' style={{background:'#f8f9fa'}}>
       <StyledTitle>
     Similar Properties
         </StyledTitle>
 
         <Grid container className='container' justifyContent="center" alignItems="center"style={{background:'#f8f9fa'}}>
           <SingleCard items={propertyData || []} />
         </Grid>
       </Box>
      } */}
     
    </section>

  );
}

export default Listings;
