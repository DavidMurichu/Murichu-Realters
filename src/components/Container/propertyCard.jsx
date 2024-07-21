import React, { useEffect } from 'react';
import { Container, Box, Typography, Grid, IconButton, CircularProgress, TextField, Button, Avatar, List, ListItem, ListItemText } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Room, AttachMoney, Home, KingBed, NavigateBefore, NavigateNext, WhatsApp, Email, Phone, ShoppingCart } from '@mui/icons-material';
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

  console.log('property', property);
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
    property_features, // Assuming this is an array of features
    agent_name,
    agent_photo,
    agent_whatsapp,
    agent_email,
    agent_phone,
  } = property;

  const dummyFeatures = [
    "Main bedroom with built-in cupboards, walk-in closet and wooden floors",
    "Bedroom 2 with built-in cupboards and wooden floors",
    "Bedroom 3 with built-in cupboards and wooden floors",
    "Bathroom with french doors, bidet, double basin, double shower, jacuzzi bath, toilet and tiled floors",
    "Reception room with chandelier, french doors, granite flooring and marble floors",
    "Entrance hall with chandelier, high ceilings, staircase, granite flooring and marble floors",
  ];

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box position="relative" height="70vh" width="100vw" left="50%" right="50%" marginLeft="-50vw" marginRight="-50vw" bgcolor="#f0f0f0">
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                  hasPrev && (
                    <IconButton onClick={onClickHandler} style={{ position: 'absolute', top: '50%', left: '20px', zIndex: 1, background: '#000' }}>
                      <NavigateBefore style={{ color: '#fff' }} />
                    </IconButton>
                  )
                }
                renderArrowNext={(onClickHandler, hasNext, label) =>
                  hasNext && (
                    <IconButton onClick={onClickHandler} style={{ position: 'absolute', top: '50%', right: '20px', zIndex: 1, background: '#000' }}>
                      <NavigateNext style={{ color: '#fff' }} />
                    </IconButton>
                  )
                }
              >
                {property_images.map((src, index) => (
                  <div key={index} style={{ height: '70vh', overflow: 'hidden' }}>
                    <img src={src} alt={`property-${index}`} style={{ width: '100vw', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </Carousel>
            </Box>
          </Grid>
        </Grid>

        <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
          <Typography variant="h5" component="h4" gutterBottom style={{ fontWeight: 'bold', color: '#000' }}>
            {property_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom style={{ color: '#000', marginBottom: '16px' }}>
            <Room style={{ color: '#27ae60' }} />{property_address}, {property_city}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1" component="div" style={{ marginBottom: '8px', color: '#000' }}>
                  <Home style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Type: {property_type}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '8px', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <ShoppingCart style={{ verticalAlign: 'middle', marginRight: '8px' }} /> {property_tenure}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '8px', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <AttachMoney style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Price: Ksh: {property_price}
                </Typography>
                <Typography variant="body1" component="div" style={{ marginBottom: '16px', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <KingBed style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Bedrooms: {property_bedrooms}
                </Typography>
              </Box>

              <Box mt={2}>
                <Typography variant="h6" gutterBottom style={{ color: '#000', marginBottom: '16px' }}>
                  Features
                </Typography>
                <List>
                  {(Array.isArray(property_features) && property_features.length > 0 ? property_features : dummyFeatures).map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                  Make a Request
                </Typography>
                <form noValidate autoComplete="off">
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#000' } }}
                    InputProps={{
                      style: { color: '#000' },
                      classes: { notchedOutline: { borderColor: '#000' } },
                    }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#000' } }}
                    InputProps={{
                      style: { color: '#000' },
                      classes: { notchedOutline: { borderColor: '#000' } },
                    }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: '#000' } }}
                    InputProps={{
                      style: { color: '#000' },
                      classes: { notchedOutline: { borderColor: '#000' } },
                    }}
                  />
                  <Button variant="contained" style={{ backgroundColor: '#27ae60', color: '#fff' }} fullWidth>
                    Send Message
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>

          <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mt={3}>
            <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
              Agent Information
            </Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar src={agent_photo} alt={agent_name} />
              </Grid>
              <Grid item>
                <Typography variant="body1" style={{ color: '#000' }}>{agent_name}</Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <IconButton href={`https://wa.me/${agent_whatsapp}`} target="_blank" style={{ color: '#27ae60' }}>
                    <WhatsApp />
                  </IconButton>
                  <IconButton href={`mailto:${agent_email}`} style={{ color: '#27ae60' }}>
                    <Email />
                  </IconButton>
                  <IconButton href={`tel:${agent_phone}`} style={{ color: '#27ae60' }}>
                    <Phone />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
          <Typography variant="body1" paragraph style={{ color: '#000' }}>
            {property_description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PropertyInformationPage;
