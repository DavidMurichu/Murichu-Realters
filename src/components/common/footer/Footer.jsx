import React, { memo } from "react"
import { footer } from "../../data/Data"
import "./footer.css"

import { Box, Grid, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import logo from '../../images/lightlogo.png'

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box className='footerContact'>
      <Grid container className='container' justifyContent="center" alignItems="center">
        <Grid container className='send flex' direction={isSmallScreen ? 'column' : 'row'} spacing={2}>
          <Grid item className='text'>
            <Typography variant={isSmallScreen ? "h5" : "h1"}>
              Do You Have Questions?
            </Typography>
            <Typography variant="body1">
              We'll help you to grow your career and growth.
            </Typography>
          </Grid>
          <Grid item>
            <Button 
              variant="contained"
              sx={{
                borderRadius: '30px',
                padding: '1% 2%',
                color: '#27ae60',
                fontSize: '1rem',
                fontWeight: 400,
                border: '5px solid #27ae601f',
                backgroundColor: '#fff',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                width: isSmallScreen ? '100%' : 'auto',
              }}
            >
              Contact Us Today
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>

      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src={logo} alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input '>
                <input type='text' placeholder='Email Address' />
                <button className="btn-s">Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal' style={{maxWidth:'100%'}}>
        <span>© 2024. Designd By David.</span>
      </div>
      
    </>
  )
}

export default memo(Footer)
