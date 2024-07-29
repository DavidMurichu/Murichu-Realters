import React, { useEffect, useState } from "react";
import RecentCardCustom from "../Container/RecentCardCustom";
import "../home/recent/recent.css";
import AdvancedFilter from "../filter/AdvanceFilter";
import { FetchData } from "../appService/Delay";
import SingleCard from "../Container/SingleCardGrid";
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from "@mui/material";


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


  const StyledTitle = styled(Typography)`
  font-size: 1.5rem; /* Adjust the font size */
  font-weight: 700; /* Make the text bold */
  color: black; /* Dark grey color for better readability */
  margin-bottom: 1rem; /* Add space below the text */
  text-align: center; /* Center align the text */
 
`;

  return (
    <section className='blog-out mb' style={{ maxWidth: '100%' }}>
      <AdvancedFilter data={propertyData} onFilterUpdate={setFilteredList} />
      <div className='container recent'>
        
        <RecentCardCustom list={filteredList} />
      </div>
      <Box className='footerContact' justifyContent='center'>
      <StyledTitle>
    Similar Properties
        </StyledTitle>

        <Grid container className='container' justifyContent="center" alignItems="center">
       
          <SingleCard items={propertyData || []} /> {/* Ensure items is an array */}
        </Grid>
      </Box>
    </section>

  );
}

export default Listings;
