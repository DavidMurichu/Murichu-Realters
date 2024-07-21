import React from 'react';
import { Card, CardContent, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Maincard from '../admin/Layouts/maincard';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  borderRadius: 15,
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  overflow: 'visible',
  padding: theme.spacing(2),
}));

const CardHeading = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#333',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  padding: '0.5rem 1.5rem',
  color: '#fff',
  backgroundColor: '#27ae60',
  '&:hover': {
    backgroundColor: '#219150',
  },
}));

const CardRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

const DashCard = () => {
  return (
    <Maincard >
      <CardContent>
        <CardHeading>Card Heading</CardHeading>

        <Grid style={{display:'flex'}}>
        <Button
                variant="contained"
                color="primary"
                style={{width:'fit-content'}}
                component={Link}
                to="/admin/add-property"
                sx={{ mr: 1 }}
            >
                Add property
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/admin/add-property"
                sx={{ mr: 1 }}
            >
                Add property
            </Button>
        </Grid>
        
      </CardContent>
    </Maincard>
  );
};

export default DashCard;
