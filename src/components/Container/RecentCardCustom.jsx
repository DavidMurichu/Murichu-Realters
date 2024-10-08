import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, IconButton, Card, CardContent, CardMedia, Chip, Grid, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Favorite, FavoriteBorder, Compare, CameraAlt, Delete, Mail } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { CompareContext } from '../appService/compareService';
import { ToastContainer, toast } from 'react-toastify';
import { TenureContext } from '../appService/TenureProvider';
import { PostData, formatPrice } from '../appService/Delay';
import ImageViewer from './ImageCard';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const ContactForm = ({ open, handleClose, property }) => {
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  


  const handleSubmit = async () => {
    const formData = {
      name,
      email,
      phonenumber,
      message,
      property: property.id,
      subject,
    };

    try {
      const response = await PostData('user-responses/', formData);
      console.log('response status', response)
      if (response['status']===201) {
        toast.success('Message sent successfully');
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.log('error', error);
      toast.error('An error occurred while sending the message');
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Contact Agent</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{property.property_name}</Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Phone Number"
          fullWidth
          variant="outlined"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Subject"
          fullWidth
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Message"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Send</Button>
      </DialogActions>
    </Dialog>
  );
};
const RecentCardCustom = ({ list, handleDelete, agent=null}) => {
  const { compare, setCompare } = useContext(CompareContext);
  const { setPropertyTenure } = useContext(TenureContext);

  const [items, setItems] = useState(list);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openContactForm, setOpenContactForm] = useState(false);
  const [openImageViewer, setOpenImageViewer] = useState(false);
  const [images, setImages] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(6); 
  const history = useHistory();

  const handleViewMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 6); // Show 6 more items
};


  useEffect(() => {
    setItems(list);
  }, [list]);

  const reloadPage = () => {
    setPropertyTenure('');
    window.location.reload();
  };

  const addCompare = (val) => {
    if (compare[val.id]) {
      toast.error('Item already exists in compare', { autoClose: 1000 });
    } else {
      setCompare((prev) => ({
        ...prev,
        [val.id]: val,
      }));
      toast.success('Item added to compare');
    }
  };

  const handleDisplay = (val) => {
    history.push({
      pathname: `/property-details/${val.id}`,
      state: { property: val },
    });
  };

  const handleImageClick = (val) => {
    setImages(val.property_images); 
    setOpenImageViewer(true); 
  };

  const toggleFavourite = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  const handleContact = (property) => {
    setSelectedProperty(property);
    setOpenContactForm(true);
  };

  return (
    <>
      {items.length === 0 || items === null ? (
        <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body1">No properties.</Typography>
          <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>
            Reload
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} mt={2} style={{margin:{xs:'10px', sm:0 }, maxWidth:'100%'}}>
         {items.slice(0, visibleItemsCount).map((val) => (
            <Grid item xs={12} sm={6} md={4} key={val.id} sx={{ m: { xs: 3, sm: 0 } }}>
              <StyledCard sx={{ boxShadow: 3 }}>
                <Box
                  onClick={() => handleDisplay(val)}
                  sx={{ cursor: 'pointer' }}
                  onKeyDown={(e) => e.stopPropagation()}
                  onKeyUp={(e) => e.stopPropagation()}
                  onKeyPress={(e) => e.stopPropagation()}
                  role="button"
                  tabIndex={0}
                >
                  <CardMedia
                    component="img"
                    image={val.property_images[0]}
                    alt={val.property_name}
                    sx={{
                      height: 200,
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={`For ${val.property_tenure}`}
                        sx={{
                          backgroundColor: val.property_tenure === 'sale' ? '#25b5791a' : '#ff98001a',
                          color: val.property_tenure === 'sale' ? '#25b579' : '#ff9800',
                        }}
                      />
                      <Button variant="outlined" color="primary" onClick={() => handleDisplay(val)}>
                        View
                      </Button>
                      <IconButton onClick={(e) => {
                        e.stopPropagation();
                        toggleFavourite(val.id);
                      }}>
                        {val.isFavourite ? <Favorite sx={{ color: 'orange' }} /> : <FavoriteBorder sx={{ color: 'white' }} />}
                      </IconButton>
                    </Box>
                    <Typography variant="h6">{val.property_name}</Typography>
                    <Typography 
  variant="body2" 
  color="textSecondary" 
  sx={{ 
    fontSize: '15px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px' // Adds space between icons and text
  }}
>
  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <i className="fa fa-location-dot" style={{ color: '#27ae60' }} /> 
    {val.property_address}, {val.property_city}
  </span>
  
  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <i className="fa fa-bed" style={{ color: '#27ae60', marginLeft: '10px' }} /> 
    {val.property_bedrooms} Bedrooms
  </span>
</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography
                        variant="outlined"
                        color="primary"
                        sx={{
                          borderRadius: '20px',
                          fontSize: '15px',
                          padding: '1rem',
                          color: 'white',
                          background: '#27ae60',
                        }}
                      >
                        Ksh: {formatPrice(val.property_price)} {/* Format price */}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {val.property_type}
                      </Typography>
                    </Box>

                    {!handleDelete &&
                    (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContact(val);
                      }}
                      sx={{ position: 'absolute', bottom: 10, right: 10, color: 'green' }}
                    >
                      <Mail />
                      <Typography variant="caption" color="green">
                          Contact
                      </Typography>
                    </IconButton>

                    )
                    }
                                      </CardContent>
                                    </Box>
                                    <Box className="hover-icons">
                                      <IconButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          addCompare(val);
                                        }}
                                        sx={{ color: 'white' }}
                                      >
                                        <Compare />
                                        <Typography variant="caption" color="inherit">
                                          Compare
                                        </Typography>
                                      </IconButton>
                                      <IconButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleImageClick(val);
                                        }}
                                        sx={{ color: 'white' }}
                                      >
                                        <CameraAlt />
                                        <Typography variant="caption" color="inherit">
                                          View Photos
                                        </Typography>
                                      </IconButton>
                                      <IconButton
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleFavourite(val.id);
                                        }}
                                        sx={{ backgroundColor: val.isFavourite ? 'orange' : '#27ae60', borderRadius: 1, p: 1, color: 'white' }}
                                      >
                                        <Favorite />
                                        <Typography variant="caption" color="inherit">
                                          Add to Favorites
                                        </Typography>
                                      </IconButton>
                                      {handleDelete && (
                                        <IconButton
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(val.id);
                                          }}
                                          sx={{ color: 'white' }}
                                        >
                                          <Delete />
                                          <Typography variant="caption" color="inherit">
                                            Delete
                                          </Typography>
                                        </IconButton>
                                      )}
                                    </Box>
                                  </StyledCard>
                                </Grid>
                              ))} 
                            
                            </Grid>
                          )}{visibleItemsCount < items.length && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  cursor: 'pointer', 
                                  color: 'primary.main', 
                                  fontWeight: 'bold', 
                                  fontSize: '1rem', 
                                  textDecoration: 'underline',
                                  '&:hover': {
                                    color: 'secondary.main',
                                    textDecoration: 'none',
                                  }
                                }} 
                                onClick={handleViewMore}
                              >
                                View More
                              </Typography>
                            </Box>
                          )}
                          
                          <ToastContainer style={{ zIndex: 9999999999 }} />
                          {selectedProperty && (
                            <ContactForm
                              open={openContactForm}
                              handleClose={() => setOpenContactForm(false)}
                              property={selectedProperty}
                            />
                          )}
                           <Dialog open={openImageViewer} onClose={() => setOpenImageViewer(false)} maxWidth="md" fullWidth>
                          <DialogTitle>Property Images</DialogTitle>
                          <DialogContent>
                            <ImageViewer images={images} />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setOpenImageViewer(false)}>Close</Button>
                          </DialogActions>
                        </Dialog>
                       

                        </>
                      );
                    };
                    
                    export default RecentCardCustom;
                    
