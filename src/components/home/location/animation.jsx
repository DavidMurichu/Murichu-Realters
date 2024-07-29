import React, { useState, useCallback, useEffect, useContext } from 'react';
import { Container, styled, keyframes, Box, Typography, Button, Card, CardContent, CardMedia, Grid, Link } from '@mui/material';
import { ArrowBack, ArrowForward, Home, Business, LocationCity } from '@mui/icons-material';
import { TenureContext } from '../../appService/TenureProvider';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const AnimatedBox = styled(Box)(({ direction }) => ({
  display: 'flex',
  animation: `${direction === 'next' ? slideInRight : slideInLeft} 0.5s forwards`,
  overflow: 'hidden',
}));

const StyledCard = styled(Card)`
  animation: ${slideInLeft} 1s ease-in-out;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .hover-icons {
    display: none;
    position: absolute;
    top: 10px;
    right: 10px;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    border-radius: 4px;
    transition: opacity 0.3s ease;
  }

  &:hover .hover-icons {
    display: flex;
    opacity: 1;
  }
`;

const CarouselContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;

  &:hover .navigation-buttons {
    opacity: 1;
  }
`;

const NavigationButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  minWidth: 'unset',
  padding: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',

  '&:hover': {
    backgroundColor: '#ffffff',
    transform: 'scale(1.1)',
  },

  '& svg': {
    fontSize: '24px',
    color: '#333',
  },

  [theme.breakpoints.down('sm')]: {
    width: '35px',
    height: '35px',
  },
}));

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;

const LocationCarousel = ({ items }) => {
  const history=useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const itemsToShow = 3;
  const {location, setLocation}=useContext(TenureContext);

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < itemsToShow; i++) {
      const item = items[(currentIndex + i) % items.length];
      if (item) {
        visibleItems.push(item);
      }
    }
    return visibleItems;
  };

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      handleNext();
    }, 3000);


    return () => clearInterval(autoSlideInterval);
  }, [handleNext]);

  const setRedirect=(val)=>{
    setLocation(val);
    toast.success(location);
    history.push('/listings');
  }
  

  return (
    <Container>
      <CarouselContainer>
        <AnimatedBox direction={direction}>
          <Grid container spacing={2}>
            {getVisibleItems().map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} onClick={()=>setRedirect(item.name)}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    image={item.cover}
                    alt={item.name}
                    style={{
                      height: '200px', // Set a fixed height for uniformity
                      objectFit: 'cover', // Ensure the image covers the area while maintaining aspect ratio
                    }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>{item.name}</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {Object.entries(item.propertyTypes).map(([type, count]) => (
                        <Box key={type} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Home sx={{ marginRight: 0.5 }} />
                          <Typography variant="body2">{`${type}: ${count}`}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business sx={{ marginRight: 0.5 }} />
                      <Typography variant="body2">Total Properties: {item.propertyCount}</Typography>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </AnimatedBox>
        <PrevButton onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowBack />
        </PrevButton>
        <NextButton onClick={handleNext} disabled={currentIndex + itemsToShow >= items.length}>
          <ArrowForward />
        </NextButton>
      </CarouselContainer>
    </Container>
  );
};

export default LocationCarousel;
