import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, IconButton, CircularProgress, TextField, Button, Avatar, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Room, AttachMoney, Home, KingBed, WhatsApp, Email, Phone, ShoppingCart } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';

const PropertyInformationPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { property } = location.state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  // Preload images
  useEffect(() => {
    if (property && property.property_images) {
      property.property_images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [property]);

  useEffect(() => {
    if (!property) {
      history.push('/');
    }
  }, [property, history]);

  if (!property) {
    return <CircularProgress />;
  }

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
    property_features,
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

  const openCarousel = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <Container maxWidth="lg" style={{ overflowX: 'hidden', padding: 0 }}>
      <Box mt={4}>
        <Box position="relative" width="100%" bgcolor="#f0f0f0">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            onClickItem={(index) => openCarousel(index)}
          >
            {property_images.map((src, index) => (
              <div key={index} style={{ width: '100%' }}>
                <img src={src} alt={`property-${index}`} style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>
          <Button
            variant="contained"
            onClick={() => openCarousel(0)}
            style={{
              background: 'white',
              color: 'black',
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Gallery
          </Button>
        </Box>

        {/* Name Address Card */}
        <Box mt={-1} mb={3} textAlign="center" width="100%">
          <Card
            style={{
              width: '100%',
              backgroundColor: '#27ae60',
              color: '#fff',
              zIndex: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                {property_name}
              </Typography>
              <Typography variant="subtitle1">
                <Room style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                {property_address}, {property_city}, {property_price}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Fixed Position Carousel */}
        {isOpen && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <Carousel
              selectedItem={photoIndex}
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay={false}
              onChange={(index) => setPhotoIndex(index)}
              onClickItem={() => setIsOpen(false)}
            >
              {property_images.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`property-${index}`} style={{ maxHeight: '100vh', objectFit: 'contain' }} />
                </div>
              ))}
            </Carousel>
          </Box>
        )}

        <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <Home style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Type: {property_type}
                </Typography>
                <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <ShoppingCart style={{ verticalAlign: 'middle', marginRight: '8px' }} /> {property_tenure}
                </Typography>
                <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <AttachMoney style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Price: Ksh: {property_price}
                </Typography>
                <Typography variant="body1" component="div" style={{ display: 'flex', alignItems: 'center', color: '#fff', backgroundColor: '#27ae60', padding: '8px', borderRadius: '4px' }}>
                  <KingBed style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Bedrooms: {property_bedrooms}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
                  Features
                </Typography>
                <List style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {(Array.isArray(property_features) && property_features.length > 0 ? property_features : dummyFeatures).map((feature, index) => (
                    <ListItem key={index} style={{ display: 'list-item', padding: '0' }}>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Box> 
            </Grid>
          </Grid>
          <Grid item xs={12}>
  <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
    {/* Get in touch */}
    <Box flex={1} p={2} yyyyy borderRadius={8}>
      <Typography variant="h6" gutterBottom style={{ color: '#000' }}>
        Get In Touch
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
          label="Surname"
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
          label="Phone Number"
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
          Request
        </Button>
      </form>
    </Box>
    
    {/* Agent Info */}
    <Box flex={1} p={2}  borderRadius={8}>
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
</Grid>

         
          <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
            <Typography variant="body1" paragraph style={{ color: '#000' }}>
              {property_description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PropertyInformationPage;
