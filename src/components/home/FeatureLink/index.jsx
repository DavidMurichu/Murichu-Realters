import React from 'react';
import { Box } from '@mui/material';
import LinkCard from '../../Container/LinkCard';
import buy from '../../images/buyhome.jpeg';
import sell from '../../images/sellhome.jpeg';
import rent from '../../images/renthome.jpeg';

const FeaturedLink = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: '90%',
        mx: 'auto',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <LinkCard
        avatarSrc={buy}
        buttontext="Buy options"
        title="Buy a home"
        subtitle="Discover our latest properties, meticulously selected to meet your needs and lifestyle. Explore now and find your perfect home."
        tenure="buy"
        sx={{ mb: { xs: 2, md: 0 }, mr: { xs: 0, md: 2 } }}
      />
      <LinkCard
        avatarSrc={rent}
        title="Rent a home"
        buttontext="Rentals"
        subtitle="Discover our latest properties, meticulously selected to meet your needs and lifestyle. Explore now and find your perfect home."
        tenure="rent"
        sx={{ mb: { xs: 2, md: 0 }, mx: { xs: 0, md: 2 } }}
      />
      <LinkCard
        avatarSrc={sell}
        buttonurl='/contact'
        buttontext="Sell Home"
        title="Sell a home"
        subtitle="Discover our latest properties, meticulously selected to meet your needs and lifestyle. Explore now and find your perfect home."
        tenure="sell"
        sx={{ mb: { xs: 2, md: 0 }, ml: { xs: 0, md: 2 } }}
      />
    </Box>
  );
};

export default FeaturedLink;
