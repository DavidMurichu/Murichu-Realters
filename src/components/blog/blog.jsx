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
  maxHeight: '400px', // Limit the height of the image
  height: 'auto',
  objectFit: 'contain',
  marginTop: '20px', // Space between text and image
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
});

// Styled component for the text content
const TextContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
  lineHeight: 1.6, // Improve readability
  color: '#333', // Darker text color
  
  // Style links within the content
  '& a': {
    color: '#27ae60', // Link color
    textDecoration: 'underline',
    '&:hover': {
      color: '#1e8c4b', // Darker green on hover
    }
  }
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
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#444' // Subtle color for the title
          }}
        >
          {blog.title}
        </Typography>
        <TextContainer>
          <Typography 
            dangerouslySetInnerHTML={{__html: blog.body}} 
            sx={{ 
              mt: 2, 
              textAlign: 'justify' // Better alignment for text
            }} 
          />
        </TextContainer>
        <StyledImage src={blog.image} alt={blog.title} />
      </Container>
    </StyledSection>
  );
};

export default BlogDetails;
