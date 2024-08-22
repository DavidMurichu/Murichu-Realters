import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, Button, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import BlogDetails from './blog';
import { Delete } from '@mui/icons-material';

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

const HoverIcons = styled(Box)`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 4px;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const BlogCard = ({ list, handleDelete }) => {
  const [items, setItems] = useState(list);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    setItems(list);
  }, [list]);

  const reloadPage = () => {
    window.location.reload(); // Simple page reload
  };

  const handleDisplay = (val) => {
    setSelectedBlog(val); // Set the selected blog
  };

  const handleBack = () => {
    setSelectedBlog(null); // Return to the list view
  };

  const TextExcerpt = ({ text }) => {
    const wordLimit = 20;
    const words = text.split(' ');
    const excerpt = words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    return excerpt;
  };

  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={handleBack} />;
  }

  return (
    <>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', p: 3, border: '1px solid #ccc', borderRadius: 1 }}>
          <Typography variant="body1">No blogs available.</Typography>
          <Button onClick={reloadPage} variant="contained" color="primary" sx={{ mt: 2 }}>
            Reload
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ width: '100%', p: 2 }}>
          {items.map((val) => (
            <Grid item xs={12} sm={4} md={4} lg={4} key={val.id}>
              <StyledCard sx={{ height: '100%' }}>
                <Box
                  onClick={() => handleDisplay(val)}
                  sx={{ cursor: 'pointer' }}
                  role="button"
                  tabIndex={0}
                >
                  <CardMedia
                    component="img"
                    image={val.image}
                    alt={val.title}
                    sx={{
                      height: { xs: 150, sm: 200 },
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        textTransform: 'capitalize',
                        '::first-letter': {
                          textTransform: 'uppercase'
                        }
                      }}
                    >
                      {val.title}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      <TextExcerpt text={val.body} />
                    </Typography>
                  </CardContent>
                </Box>
                {handleDelete && (
                  <HoverIcons>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(val.id);
                      }}
                      sx={{ color: 'white' }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </HoverIcons>
                )}
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default BlogCard;
