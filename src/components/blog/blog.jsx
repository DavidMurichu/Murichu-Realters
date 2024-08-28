import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';

// Styled component for the button
const StyledButton = styled(Button)({
  backgroundColor: '#27ae60',
  color: '#fff',
  borderRadius: '5px',
  textTransform: 'none',
  padding: '10px 20px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#1e8c4b',
  }
});

// Styled component for the container
const ButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '20px',
  cursor: 'pointer',
});

const BackButton = ({ onBack }) => {
  return (
    <ButtonContainer onClick={onBack} sx={{ margin: '2rem' }}>
      <StyledButton>
        Go Back
      </StyledButton>
    </ButtonContainer>
  );
};

// Styled component for the section
const StyledSection = styled('section')({
  marginBottom: '80px',
});

// Styled component for the image
const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
});

// Styled component for the text content
const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
});

const BlogDetails = ({ blog, onBack }) => {
  return (
    <StyledSection>
      <BackButton onBack={onBack} /> {/* Include the back button */}
      <Container sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            textTransform: 'capitalize',
            textAlign: 'center'
          }}
        >
          {blog.title}
        </Typography>
        <StyledImage src={blog.image} alt={blog.title} />
        <TextContainer>
          <Typography dangerouslySetInnerHTML={{__html: blog.body}} sx={{ mt: 2 }} />
        </TextContainer>
      </Container>
    </StyledSection>
  );
};

export default BlogDetails;
