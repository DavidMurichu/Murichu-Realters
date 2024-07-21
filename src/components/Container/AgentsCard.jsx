import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useHistory } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material';
import { Favorite, FavoriteBorder, Compare, CameraAlt, Delete } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { CompareContext } from '../appService/compareService';
import { showToast } from '../appService/Toast/Toast';
import { ToastContainer } from 'react-toastify';
import Maincard from '../admin/Layouts/maincard';
import { TenureContext } from '../appService/TenureProvider';
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

const AgentCardCustom = ({ list }) => {
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
      showToast('Item already exists in compare', 'error');
    } else {
      setCompare((prev) => ({
        ...prev,
        [val.id]: val,
      }));
      showToast('Item added to compare', 'success');
    }
  };

  const handleViewPhoto = () => {};

 

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/agents/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
        },
      });

      if (response.status === 204) {
        showToast('Image deleted successfully', 'success');
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        showToast('Failed to delete image', 'error');
      }
    } catch (error) {
      showToast('Error deleting image', 'error');
      console.error('Error deleting image:', error);
    }
  };

  return (
    <>
      {items.length === 0 || items === null ? (
        <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body1">No Agents with the filter.</Typography>
          <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>Reload</Button>
        </Box>
      ) : (
        <Grid container spacing={3} mt={2}>
          {items.map((val) => (
            <Grid item xs={12} sm={6} md={4} key={val.id}>
              <StyledCard sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={val.profile_image}
                  alt={val.property_name}
                  sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}
                />
                <CardContent>
          
                  <Typography variant="h6">{val.name}</Typography>
                  <Typography variant="body2" color="textSecondary" fontSize='15px'>
                    <i className="fa fa-location-dot" /> {val.email}, {val.phone}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Button variant="outlined" color="primary" style={{
                      borderRadius: '20px',
                      fontSize: '15px',
                      padding: '1rem',
                      color: 'white',
                      background: '#27ae60'
                    }}>
                      {val.city_name}
                    </Button>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{val.property_type}</Typography>
                  </Box>
                </CardContent>
                <Box className="hover-icons">
                  <IconButton onClick={() => handleDelete(val.id)} sx={{ color: 'white' }}>
                    <Delete />
                    <Typography variant="caption" color="inherit">Delete</Typography>
                  </IconButton>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      <ToastContainer style={{ zIndex: 9999999999 }} />
    </>
  );
};

export default AgentCardCustom;
