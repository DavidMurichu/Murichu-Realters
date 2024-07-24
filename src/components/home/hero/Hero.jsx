import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, TextField, Container, Card, CardContent } from "@mui/material";
import "./hero.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HeroFilter from "./HeroFilter";

const Hero = () => {
  return (
    <Box component="section" className="hero">
      <video autoPlay muted loop id="background-video">
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Container className="container top-container ">
        <Box className="home-search" component={Link} to="/listings" sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#27ae60', borderRadius: '20px', padding: '10px', marginBottom: '20px', color: 'white', textDecoration: 'none' }}>
          <i className="fa fa-search" style={{ marginRight: '10px' }}></i>
          <Typography variant="h6" component="h3" sx={{ fontSize: '1rem', margin: 0 }}>Click here to search for properties</Typography>
        </Box>

        <Card className="contact-hero-card" sx={{ display: 'flex', flexDirection: 'column', padding: '30px', backgroundColor: 'rgba(53, 43, 70, 0.795)', borderRadius: '10px', color: 'white' }}>
          <Typography variant="h6" component="h1" className="card-heading" sx={{ fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif', padding: '5%' }}>
            MURICHU REALTERS
          </Typography>
          <Typography component="p" sx={{ fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif', paddingLeft: '6%' }}>
            Receive updates, hot deals, tutorials, and discounts sent straight to your inbox every month.
          </Typography>
          <Button component={Link} to="/contact" sx={{ padding: '6%', paddingTop: 0, textDecoration: 'underline', color: 'inherit' }}>Contact our agents</Button>
        </Card>
      </Container>
      <HeroFilter />
    </Box>
  );
};

export default Hero;