import React, { useEffect } from 'react';
import { Container, Box, Typography, Grid, Chip, IconButton, CircularProgress } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Room, AttachMoney, Home, KingBed, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';

const PropertyInformationPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { property } = location.state || {};

  useEffect(() => {
    if (!property) {
      history.push('/');
    }
  }, [property, history]);

  if (!property) {
    // Render loading spinner or message if property data is not available yet
    return <CircularProgress />;
  }
  console.log('property', property)
  const {
    property_name,
    property_city,
    property_address,
    property_price,
    property_tenure,
    property_type,
    property_bedrooms,
    property_images,
    property_description,
  } = property;

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3} position="relative">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <IconButton onClick={onClickHandler} style={{ position: 'absolute', top: '50%', left: '20px', zIndex: 1, background:'black' }}>
                       <NavigateBefore
                      style={{color:'white'}}
                      
                      />
                      
                    </IconButton>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <IconButton onClick={onClickHandler} style={{ position: 'absolute', top: '50%', right: '20px', zIndex: 1 , background:'black'}}>
                      <NavigateNext
                      
                      style={{color:'white'}}
                      />
                      
                     
                    </IconButton>
                  )
                }
              >
                {property_images.map((src, index) => (
                  <div key={index}>
                    <img src={src} alt={`property-${index}`} style={{ borderRadius: '8px', marginBottom: '16px', maxWidth: '100%' }} />
                  </div>
                ))}
              </Carousel>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
              <Typography variant="h5" component="h4" gutterBottom style={{ fontWeight: 'bold' }}>
                {property_name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                <Room />{property_address}, {property_city}
              </Typography>

              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} style={{ display: 'flex', margin: '3px' }}>
                    <Chip
                      icon={<Home />}
                      label={`Type: ${property_type}`}
                      color="primary"
                      variant="outlined"
                      style={{ padding: '8px 12px', backgroundColor: '#e1f5fe', width: 'fit-content' }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <Chip
                      icon={<Room />}
                      label={`${property_tenure}`}
                      color="secondary"
                      variant="outlined"
                      style={{ padding: '8px 12px', backgroundColor: '#fce4ec', width: 'fit-content' }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} style={{ display: 'flex', margin: '3px' }}>
                    <Chip
                      icon={<AttachMoney />}
                      label={`Price: Ksh: ${property_price}`}
                      color="primary"
                      variant="outlined"
                      style={{ padding: '8px 12px', backgroundColor: '#e1f5fe', width: 'fit-content' }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6}>
                    <Chip
                      icon={<KingBed />}
                      label={`Bedrooms: ${property_bedrooms}`}
                      color="secondary"
                      variant="outlined"
                      style={{ padding: '8px 12px', backgroundColor: '#fce4ec', width: 'fit-content' }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
          <Typography variant="body1" paragraph>
            {property_description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PropertyInformationPage;
