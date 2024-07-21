import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material';
import { Favorite, FavoriteBorder, Compare, CameraAlt, Delete } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { CompareContext } from '../appService/compareService'; // Assuming CompareContext is defined correctly
import { ToastContainer, toast } from 'react-toastify';
import PropertyInformationPage from './propertyCard';

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

const RecentCardCustom = ({ list, handleDelete }) => {
  const { compare, setCompare } = useContext(CompareContext); // Ensure CompareContext is correctly imported and provided

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

  const handleDisplay = (val) => {
    history.push({
      pathname: `/property-details/${val.id}`,
      state: { property: val }
    });
  };
  const handleImageClick = (val) => {
    history.push({
      pathname: `/view-photos/${val.id}`,
      state: { images: val.property_images }
    });
  };

  const handleViewPhoto=()=>{

  }
  const toggleFavourite = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isFavourite: !item.isFavourite } : item
      )
    );
  };

  return (
    <>
      {items.length === 0 || items === null ? (
        <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body1">No properties with the filter.</Typography>
          <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>Reload</Button>
        </Box>
      ) : (
        <Grid container spacing={3} mt={2} >
          {items.map((val) => (
            <Grid item xs={12} sm={6} md={4} key={val.id}>
              <StyledCard sx={{ boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={val.property_images[0]}
                  alt={val.property_name}
                  sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}
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
                    <Button variant="outlined" color="primary" onClick={() => handleDisplay(val)}>View</Button>
                    <IconButton onClick={() => toggleFavourite(val.id)}>
                      {val.isFavourite ? <Favorite sx={{ color: 'orange' }} /> : <FavoriteBorder sx={{ color: 'white' }} />}
                    </IconButton>
                  </Box>
                  <Typography variant="h6">{val.property_name}</Typography>
                  <Typography variant="body2" color="textSecondary" fontSize='15px'>
                    <i className="fa fa-location-dot" /> {val.property_address}, {val.property_city}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Button variant="outlined" color="primary" style={{
                      borderRadius: '20px',
                      fontSize: '15px',
                      padding: '1rem',
                      color: 'white',
                      background: '#27ae60'
                    }}>
                      Ksh: {val.property_price}</Button>
                    <Typography variant="body2" style={{ fontWeight: 'bold' }}>{val.property_type}</Typography>
                  </Box>
                </CardContent>
                <Box className="hover-icons">
                  <IconButton onClick={() => addCompare(val)} sx={{ color: 'white' }}>
                    <Compare />
                    <Typography variant="caption" color="inherit">Compare</Typography>
                  </IconButton>
                  <IconButton onClick={()=>handleImageClick(val)} sx={{ color: 'white' }}>
                    <CameraAlt />
                    <Typography variant="caption" color="inherit">View Photos</Typography>
                  </IconButton>
                 
                  <IconButton onClick={() => toggleFavourite(val.id)} sx={{ backgroundColor: val.isFavourite ? 'orange' : '#27ae60', borderRadius: 1, p: 1, color: 'white' }}>
                    <Favorite />
                    <Typography variant="caption" color="inherit">Add to Favorites</Typography>
                  </IconButton>
                  {handleDelete? (<IconButton sx={{ color: 'white' } }   onClick={()=>handleDelete(val.id)}>
                    <Delete />
                    <Typography variant="caption" color="inherit">Delete</Typography>
                  </IconButton>):(null)
                  }
                  
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

export default RecentCardCustom;
