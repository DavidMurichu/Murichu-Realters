import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography, Button, Grid, Card, CardMedia, CircularProgress } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import css
import { Carousel } from 'react-responsive-carousel';

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
`;

const ImageViewer = () => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const history = useHistory();
  const location = useLocation();
  const { images } = location.state || {};

  useEffect(() => {
    if (!images) {
      history.push('/');
    }else{
      setItems(images);
    }
  }, [images, history]);

  if (!images) {
    return <CircularProgress />;
  }

 

  const reloadPage = () => {
    history.go(0);
  };

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body1">No properties with the filter.</Typography>
          <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>Reload</Button>
        </Box>
      ) : (
        <Grid container spacing={3} mt={2}>
          {items.map((src, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard sx={{ boxShadow: 3 }} onClick={() => openLightbox(index)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={src}
                  alt={`property-${index}`}
                  sx={{ transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}
                />
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      {isOpen && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
          <Carousel
            selectedItem={photoIndex}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            useKeyboardArrows={true}
            autoPlay={false}
            onChange={(index) => setPhotoIndex(index)}
            onClickItem={() => setIsOpen(false)}
          >
            {items.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`property-${index}`} style={{ maxHeight: '100vh', objectFit: 'contain' }} />
              </div>
            ))}
          </Carousel>
        </Box>
      )}
      <ToastContainer style={{ zIndex: 9999999999 }} />
    </>
  );
};

export default ImageViewer;
