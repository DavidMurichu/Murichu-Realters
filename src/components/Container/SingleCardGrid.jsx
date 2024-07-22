import React, { useState, useCallback, useEffect } from 'react';
import { Container, styled, keyframes, Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Favorite, FavoriteBorder, Compare, CameraAlt } from '@mui/icons-material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Keyframe animations
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

const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const AnimatedBox = styled(Box)(({ direction }) => ({
  animation: `${direction === 'next' ? slideInRight : slideInLeft} 0.5s forwards`,
  display: 'flex',
  overflow: 'hidden',
}));

const StyledCard = styled(Card)`
  animation: ${fadeIn} 1s ease-in-out;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
  height: 100%;
  &:hover .navigation-buttons {
    opacity: 1;
  }
`;

const NavigationButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const PrevButton = styled(NavigationButton)`
  left: 0;
`;

const NextButton = styled(NavigationButton)`
  right: 0;
`;

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const itemsToShow = 3;

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
    }, 3000); // Adjust the time interval as needed (3000 ms = 3 seconds)

    return () => clearInterval(autoSlideInterval); // Clean up on component unmount
  }, [handleNext]);

  return (
    <Container>
      <CarouselContainer>
        <AnimatedBox direction={direction}>
          <Grid container spacing={2}>
            {getVisibleItems().map((item, index) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <StyledCard sx={{ boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.property_images ? item.property_images[0] : 'default-image.jpg'}
                    alt={item.property_name || 'Default Name'}
                    sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={`For ${item.property_tenure || 'N/A'}`}
                        sx={{
                          backgroundColor: item.property_tenure === 'sale' ? '#25b5791a' : '#ff98001a',
                          color: item.property_tenure === 'sale' ? '#25b579' : '#ff9800',
                        }}
                      />
                      <Button variant="outlined" color="primary">View</Button>
                      <IconButton>
                        {item.isFavourite ? <Favorite sx={{ color: 'orange' }} /> : <FavoriteBorder sx={{ color: 'white' }} />}
                      </IconButton>
                    </Box>
                    <Typography variant="h6">{item.property_name || 'Default Name'}</Typography>
                    <Typography variant="body2" color="textSecondary" fontSize='15px'>
                      <i className="fa fa-location-dot" /> {item.property_address || 'N/A'}, {item.property_city || 'N/A'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Button variant="outlined" color="primary" style={{
                        borderRadius: '20px',
                        fontSize: '15px',
                        padding: '1rem',
                        color: 'white',
                        background: '#27ae60'
                      }}>
                        Ksh: {item.property_price || 'N/A'}
                      </Button>
                      <Typography variant="body2" style={{ fontWeight: 'bold' }}>{item.property_type || 'N/A'}</Typography>
                    </Box>
                  </CardContent>
                  <Box className="hover-icons">
                    <IconButton sx={{ color: 'white' }}>
                      <Compare />
                      <Typography variant="caption" color="inherit">Compare</Typography>
                    </IconButton>
                    <IconButton sx={{ color: 'white' }}>
                      <CameraAlt />
                      <Typography variant="caption" color="inherit">View Photos</Typography>
                    </IconButton>
                    <IconButton sx={{ backgroundColor: item.isFavourite ? 'orange' : '#27ae60', borderRadius: 1, p: 1, color: 'white' }}>
                      <Favorite />
                      <Typography variant="caption" color="inherit">Add to Favorites</Typography>
                    </IconButton>
                    {/* Add Delete Button if needed */}
                  </Box>
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

// Example usage
const SingleCard = ({ items }) => {
  // Ensure items is an array before passing it to Carousel
  const validItems = Array.isArray(items) ? items : [];
  
  return <Carousel items={validItems} />;
};

export default SingleCard;
