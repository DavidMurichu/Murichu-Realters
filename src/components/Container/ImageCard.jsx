import React from 'react';
import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/system';

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const Image = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const ImageViewer = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <ImageContainer>
      <Image src={images[currentIndex]} alt="Property" />
      {images.length > 1 && (
        <>
          <LeftArrow onClick={handlePrevious} sx={{background: 'black', color: 'white', '&:hover':{
            background:'white', color:'black'
          }}}>
            <ArrowBack />
          </LeftArrow>
          <RightArrow onClick={handleNext}  sx={{background: 'black', color: 'white', '&:hover':{
            background:'white', color:'black'
          }}}>
            <ArrowForward />
          </RightArrow>
        </>
      )}
    </ImageContainer>
  );
};

export default ImageViewer;
