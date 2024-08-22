import React, { useState, useCallback, useEffect } from 'react';
import { Container, styled, keyframes, Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Favorite, FavoriteBorder, Compare, CameraAlt } from '@mui/icons-material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useHistory } from 'react-router-dom';
// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
  width: 100%; // Adjust width to be responsive
  height: auto; // Adjust height to be responsive
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
  zIndex: 10, // Ensure the buttons are above other content
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

const Carousel = ({ items }) => {
  const history=useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsToShow = isSmallScreen ? 1 : 3;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');

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
  
  const handleDisplay = (val) => {
    history.push({
      pathname: `/property-details/${val.id}`,
      state: { property: val },
    });
  };

  return (
    <Container style={{background:'#f8f9fa'}}>
      <CarouselContainer>
        <AnimatedBox direction={direction}>
          <Grid container spacing={2}>
            {getVisibleItems().map((item, index) => (
              <Grid item xs={12} sm={4} key={item.id} >
                <StyledCard sx={{ boxShadow: 3 }}>
                <Box
                  onClick={() => handleDisplay(item)}
                  sx={{ cursor: 'pointer' }}
                  onKeyDown={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyPress={(e) => e.stopPropagation()}
                  role="button"
                  tabIndex={0}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={item.property_images ? item.property_images[0] : 'default-image.jpg'}
                    alt={item.property_name || 'Default Name'}
                    sx={{
                      objectFit: 'cover',
                      height: '150px',
                      width: '100%',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={`For ${item.property_tenure || 'N/A'}`}
                        sx={{
                          backgroundColor: item.property_tenure === 'sale' ? '#25b5791a' : '#ff98001a',
                          color: item.property_tenure === 'sale' ? '#25b579' : '#ff9800',
                        }}
                      />
                      <Button variant="outlined" color="primary" onClick={() => handleDisplay(item)}>
                        View
                      </Button>
                      <IconButton>
                        {item.isFavourite ? <Favorite sx={{ color: 'orange' }} /> : <FavoriteBorder sx={{ color: 'white' }} />}
                      </IconButton>
                    </Box>
                    <Box display={'flex'} padding={0} justifyContent={'space-between'}>
                      <Typography variant="h6" noWrap>{item.property_name || 'Default Name'}</Typography>
                      <Typography variant="body2" noWrap>ksh: {item.property_price || 'Default price'}</Typography>
                      <Typography variant="h6" noWrap>{item.property_city || 'Default City'}</Typography>
                    </Box>
                  </CardContent>
                  {/* <Box className="hover-icons">
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
                
                  </Box> */}
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
  const validItems = Array.isArray(items) ? items : [];
  
  return <Carousel items={validItems} />;
};

export default SingleCard;
