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

      <Container className="container " >
      <HeroFilter />
      </Container>
    </Box>
  );
};

export default Hero;