import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, CircularProgress, TextField, Button, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Room, AttachMoney, Home, KingBed, ShoppingCart } from '@mui/icons-material';
import { useLocation, useHistory } from 'react-router-dom';
import AgentCardCustom from './AgentsCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Delay } from '../appService/Delay';

const PropertyInformationPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { property } = location.state || {};
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    message: '',
    property_id: property?.id ?? null,
  });


  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phonenumber: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
    message: yup.string().required('Message is required'),
  });

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
    features,
  } = property;

  const agent = property.agent;

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

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Form data:', values);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user-responses/', values);
      if (response.status === 201) {
        toast.success('Request sent successfully');
        resetForm();
        await Delay(1000);
        history.push('/listings');
      } else {
        toast.error('Error submitting request. Try again.');
      }
    } catch (error) {
      toast.error('Error submitting request. Try again.');
    }
  };

  return (
    <Container maxWidth="xl" disableGutters sx={{ overflowX: 'hidden', px: 1 }}>
      <Box>
        <Box position="relative" width="100%" bgcolor="#f0f0f0">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            onClickItem={(index) => openCarousel(index)}
            sx={{
              maxHeight: { xs: '50vh', md: '70vh' },
              '& .carousel .slide img': {
                height: { xs: '50vh', md: '70vh' },
                objectFit: 'cover',
              },
            }}
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
            sx={{
              borderRadius: '5px',
              background: 'white',
              color: 'black',
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: { xs: '0.75rem', md: '1rem' },
            }}
          >
            Gallery
          </Button>
        </Box>

        {/* Name Address Card */}
        <Box mt={-1} mb={3} textAlign="center" width="100%">
          <Card
            sx={{
              width: '100%',
              backgroundColor: '#27ae60',
              color: '#fff',
              zIndex: 2,
              px: { xs: 1, sm: 2 },
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
                {property_name}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontSize: { xs: '0.75rem', sm: '1rem' } }}>
                <Room sx={{ verticalAlign: 'middle', mr: 1 }} />
                {property_address}, {property_city}, {property_price}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Fixed Position Carousel */}
        {isOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Carousel
              selectedItem={photoIndex}
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
              autoPlay={false}
              onChange={(index) => setPhotoIndex(index)}
              onClickItem={() => setIsOpen(false)}
              sx={{
                width: '90%',
                maxHeight: '90vh',
                '& img': {
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain',
                },
              }}
            >
              {property_images.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`property-${index}`} />
                </div>
              ))}
            </Carousel>
          </Box>
        )}

        <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3} marginX={{ xs: 1, md: 10 }} mt={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    backgroundColor: '#27ae60',
                    p: 1,
                    borderRadius: '4px',
                    fontSize: { xs: '0.75rem', sm: '1rem' },
                  }}
                >
                  <Home sx={{ verticalAlign: 'middle', mr: 1 }} /> Type: {property_type}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    backgroundColor: '#27ae60',
                    p: 1,
                    borderRadius: '4px',
                    fontSize: { xs: '0.75rem', sm: '1rem' },
                  }}
                >
                  <ShoppingCart sx={{ verticalAlign: 'middle', mr: 1 }} /> {property_tenure}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    backgroundColor: '#27ae60',
                    p: 1,
                    borderRadius: '4px',
                    fontSize: { xs: '0.75rem', sm: '1rem' },
                  }}
                >
                  <AttachMoney sx={{ verticalAlign: 'middle', mr: 1 }} /> Price: Ksh: {property_price}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    backgroundColor: '#27ae60',
                    p: 1,
                    borderRadius: '4px',
                    fontSize: { xs: '0.75rem', sm: '1rem' },
                  }}
                >
                  <KingBed sx={{ verticalAlign: 'middle', mr: 1 }} /> Bedrooms: {property_bedrooms}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
                  Features
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3 }}>
                  {(Array.isArray(features) && features.length > 0 ? features : dummyFeatures).map((feature, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', py: 0 }}>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
                {/* Get in touch */}
                <Box flex={1} p={2} borderRadius={8} bgcolor="#f0f0f0">
                  <Typography variant="h6" gutterBottom sx={{ color: '#000' }}>
                    Get In Touch
                  </Typography>
                  <Formik
                    initialValues={formData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <Field
                          as={TextField}
                          label="Name"
                          name="name"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ style: { color: '#000' } }}
                          InputProps={{
                            style: { color: '#000' },
                            classes: { notchedOutline: { borderColor: '#000' } },
                          }}
                        />
                        <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

                        <Field
                          as={TextField}
                          label="Email"
                          name="email"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ style: { color: '#000' } }}
                          InputProps={{
                            style: { color: '#000' },
                            classes: { notchedOutline: { borderColor: '#000' } },
                          }}
                        />
                        <ErrorMessage name="email" component="div" style={{ color: 'red' }} />

                        <Field
                          as={TextField}
                          label="Phone Number"
                          name="phonenumber"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{ style: { color: '#000' } }}
                          InputProps={{
                            style: { color: '#000' },
                            classes: { notchedOutline: { borderColor: '#000' } },
                          }}
                        />
                        <ErrorMessage name="phonenumber" component="div" style={{ color: 'red' }} />

                        <Field
                          as={TextField}
                          label="Message"
                          name="message"
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
                        <ErrorMessage name="message" component="div" style={{ color: 'red' }} />

                        <Button
                          variant="contained"
                          sx={{ backgroundColor: '#27ae60', color: '#fff', mt: 2 }}
                          fullWidth
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Request
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </Box>

                {/* Agent Info */}
                <Box flex={1} p={2} borderRadius={8} bgcolor="#f0f0f0">
                  <Typography variant="h6" gutterBottom sx={{ color: '#000', textAlign: 'center' }}>
                    Agent Information
                  </Typography>
                  <Box display="flex" justifyContent="center">
                    <AgentCardCustom list={[agent]} isAdmin={false} sx={{ width: '100%' }} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box p={2} bgcolor="#f0f0f0" borderRadius={8} mb={3}>
            <Typography variant="body1" paragraph sx={{ color: '#000' }}>
              {property_description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PropertyInformationPage;
