import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Phone, WhatsApp, Email, Delete } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { CompareContext } from '../appService/compareService'; // Ensure CompareContext is correctly imported and provided
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../appService/Delay';

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

const AgentCardCustom = ({ list, isAdmin }) => {
  const { compare, setCompare } = useContext(CompareContext);
  const [items, setItems] = useState(list);
  const history = useHistory();

  useEffect(() => {
    setItems(list);
  }, [list]);

  const reloadPage = () => {
    history.go(0);
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

  const handleViewPhoto = () => {};

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/agents/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        toast.success('Agent deleted successfully');
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        toast.error('Failed to delete agent');
      }
    } catch (error) {
      toast.error('Error deleting agent');
      console.error('Error deleting agent:', error);
    }
  };

  const toggleFavourite = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  if (!items || items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="body1">No Agents with the filter.</Typography>
        <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>Reload</Button>
      </Box>
    );
  }

  return (
    <>
      {items.length > 1 ? (
        <Grid container spacing={2} mt={2}>
          {items.map((val) => (
            <Grid item xs={12} sm={6} md={4} key={val.id}>
              <StyledCard sx={{ boxShadow: 3, p: { xs: 1, sm: 2 }, borderRadius: '8px' }}>
                <CardMedia
                  component="img"
                  image={val.profile_image}
                  alt={val.name}
                  sx={{
                    height: { xs: 150, sm: 180, md: 200 },
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' }
                  }}
                />
                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                  <Typography variant="h6" noWrap sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mb: 1 }}>{val.name}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                    <IconButton href={`tel:${val.phone}`} sx={{ color: '#27ae60', p: 1 }}>
                      <Phone />
                    </IconButton>
                    <IconButton href={`https://wa.me/${val.phone}`} sx={{ color: '#27ae60', p: 1 }}>
                      <WhatsApp />
                    </IconButton>
                    <IconButton href={`mailto:${val.email}`} sx={{ color: '#27ae60', p: 1 }}>
                      <Email />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="textSecondary" fontSize='14px' sx={{ mb: 1 }}>
                    {val.email}, {val.phone}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{
                      borderRadius: '20px',
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      padding: '0.5rem',
                      color: 'white',
                      background: '#27ae60',
                      textAlign: 'center'
                    }}>
                      <i className="fa fa-location-dot" /> {val.city_name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{val.property_type}</Typography>
                  </Box>
                </CardContent>
                {isAdmin &&
                  <Box className="hover-icons">
                    <IconButton onClick={() => handleDelete(val.id)} sx={{ color: 'white' }}>
                      <Delete />
                      <Typography variant="caption" color="inherit">Delete</Typography>
                    </IconButton>
                  </Box>}
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <StyledCard sx={{ boxShadow: 3, maxWidth: '100%', p: { xs: 1, sm: 2 }, borderRadius: '8px' }}>
          <CardMedia
            component="img"
            image={items[0].profile_image}
            alt={items[0].name}
            sx={{
              height: { xs: 150, sm: 180, md: 200 },
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
          <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
            <Typography variant="h6" noWrap sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mb: 1 }}>{items[0].name}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              <IconButton href={`tel:${items[0].phone}`} sx={{ color: '#27ae60', p: 1 }}>
                <Phone />
              </IconButton>
              <IconButton href={`https://wa.me/${items[0].phone}`} sx={{ color: '#27ae60', p: 1 }}>
                <WhatsApp />
              </IconButton>
              <IconButton href={`mailto:${items[0].email}`} sx={{ color: '#27ae60', p: 1 }}>
                <Email />
              </IconButton>
            </Box>
            <Typography variant="body2" color="textSecondary" fontSize='14px' sx={{ mb: 1 }}>
              {items[0].email}, {items[0].phone}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="primary" sx={{
                borderRadius: '20px',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                padding: '0.5rem',
                color: 'white',
                background: '#27ae60',
                textAlign: 'center'
              }}>
                <i className="fa fa-location-dot" /> {items[0].city_name}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{items[0].property_type}</Typography>
            </Box>
          </CardContent>
          {isAdmin &&
            <Box className="hover-icons">
              <IconButton onClick={() => handleDelete(items[0].id)} sx={{ color: 'white' }}>
                <Delete />
                <Typography variant="caption" color="inherit">Delete</Typography>
              </IconButton>
            </Box>}
        </StyledCard>
      )}
      <ToastContainer />
    </>
  );
};

export default AgentCardCustom;
