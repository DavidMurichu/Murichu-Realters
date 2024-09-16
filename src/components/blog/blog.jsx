import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Helmet } from 'react-helmet';
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
  justifyContent: 'center', // Center the button
});

const BackButton = ({ onBack }) => {
  return (
    <ButtonContainer onClick={onBack}>
      <StyledButton>
        Go Back
      </StyledButton>
    </ButtonContainer>
  );
};

// Styled component for the section
const StyledSection = styled('section')({
  margin: '0 auto', // Center the section
  maxWidth: '90%', // Set a max width for readability
  padding: '20px', // Add padding for spacing
  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))', // Background image and gradient overlay
  backgroundSize: 'cover', // Ensure the image covers the section
  backgroundPosition: 'center', // Center the background image
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
  color: '#fff', // Text color
});

// Styled component for the image
const StyledImage = styled('img')({
  width: '100%',
  maxHeight: '400px', // Limit the height of the image
  height: 'auto',
  objectFit: 'cover', // Ensure the image covers its container
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
  color: '#fff', // White text color for contrast
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
      <Helmet>
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${blog.title}",
        "image": "${blog.image}",
        "author": {
          "@type": "Person",
          "name": "Author Name"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Publisher Name"
        },
        "description": "${ blog.body.slice(0, 150)}"
      }
    `}
  </script>
</Helmet>
      <BackButton onBack={onBack} /> {/* Include the back button */}
      <Container sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        textAlign: 'center' // Center the text
      }}>
        <Typography 
          variant="h4" // Adjust font size
          sx={{ 
            mb: 2, 
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color: '#fff', // White color for the title to stand out against the background
            fontFamily: "'Roboto', sans-serif" // Apply custom font
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
