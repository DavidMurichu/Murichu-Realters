import React from 'react';
import { Box, Typography, Button, IconButton, Card, CardContent, CardMedia, Chip, Grid } from '@mui/material';
import { Favorite, FavoriteBorder, Compare, CameraAlt, Delete } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledCard = styled(Card)`
  animation: ${fadeIn} 0.5s ease-in-out;
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

const SingleCardGrid = ({ list, handleDelete }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Grid container spacing={3} mt={2}>
        {list.map((val) => (
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
                  <Button variant="outlined" color="primary">View</Button>
                  <IconButton>
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
                    Ksh: {val.property_price}
                  </Button>
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>{val.property_type}</Typography>
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
                <IconButton sx={{ backgroundColor: val.isFavourite ? 'orange' : '#27ae60', borderRadius: 1, p: 1, color: 'white' }}>
                  <Favorite />
                  <Typography variant="caption" color="inherit">Add to Favorites</Typography>
                </IconButton>
                {handleDelete && (
                  <IconButton sx={{ color: 'white' }} onClick={() => handleDelete(val.id)}>
                    <Delete />
                    <Typography variant="caption" color="inherit">Delete</Typography>
                  </IconButton>
                )}
              </Box>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SingleCardGrid;
