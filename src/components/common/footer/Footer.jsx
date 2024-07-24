import React, { memo, useContext } from "react";
import { footer } from "../../data/Data";
import "./footer.css";

import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import logo from '../../images/lightlogo.png';
import SingleCard from "../../Container/SingleCardGrid";
import { DataContext } from "../../appService/data/DataProvider";
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Footer = () => {
  const StyledTitle = styled(Typography)`
  font-size: 1.5rem; /* Adjust the font size */
  font-weight: 700; /* Make the text bold */
  color: black; /* Dark grey color for better readability */
  margin-bottom: 1rem; /* Add space below the text */
  text-align: center; /* Center align the text */
 
`;
  const { data } = useContext(DataContext); // Access data from the context
  console.log('context',data);
// Styled Container for Subscribe Section
const SubscribeContainer = styled(Box)`
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 25px;
  overflow: hidden;
  max-width: 400px;

  background-color: #fff;
`;

// Styled Input Field
const StyledTextField = styled(TextField)`
  flex: 1;
  border: none;
  border-radius: 25px 0 0 25px;
  & input {
    padding: 0.5rem 1rem;
  }
`;

// Styled Subscribe Button
const StyledButton = styled(Button)`
  border-radius: 0 25px 25px 0;
  background-color: black;
  color: #fff;
  padding: 0.5rem 1.5rem;
  &:hover {
    background-color: green;
  }
`;
  return (
    <>
      <Box className='footerContact'>
      <StyledTitle>
    Similar Properties
  </StyledTitle>

        <Grid container className='container' justifyContent="center" alignItems="center">
          <SingleCard items={data || []} /> {/* Ensure items is an array */}
        </Grid>
      </Box>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo' >
              <img src={logo} alt='Logo' />
             
              <p style={{maxWidth:'400px'}}>Stay Udated and sign up for the Murichu Realty Group News Paper</p>

             <SubscribeContainer >
              <StyledTextField
                style={{border: 'none'}}
                variant="outlined"
                placeholder="Enter Email"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <StyledButton variant="contained">
                <ArrowForwardIcon />
              </StyledButton>
            </SubscribeContainer>
            </div>
          </div>

          {footer.map((val, index) => (
            <div className='box' key={index} sx={{m:{xs:3, sm:0}}}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, idx) => (
                  <li key={idx}> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal' style={{ maxWidth: '100%' }}>
        <span>© 2024. Designed By David.</span>
      </div>
    </>
  );
};

export default memo(Footer);
