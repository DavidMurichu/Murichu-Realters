import React from 'react';
import { Box, Card, CardContent, Typography, Grid, IconButton, Divider } from '@mui/material';
import { Email, Phone, LocationOn, Message, Home } from '@mui/icons-material';
import { styled } from '@mui/system';

// Styled components
const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: '20px auto',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const IconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px',
});

const ContactDetails = ({ data }) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Contact Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <IconWrapper>
              <Email color="primary" />
              <Typography variant="body1">{data.email}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconWrapper>
              <Phone color="primary" />
              <Typography variant="body1">{data.phonenumber}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12}>
            <IconWrapper>
              <Message color="primary" />
              <Typography variant="body1">{data.message}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12}>
            <IconWrapper>
              <Home color="primary" />
              <Typography variant="body1">{data.property_name}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12}>
            <IconWrapper>
              <LocationOn color="primary" />
              <Typography variant="body1">{data.property_address}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12}>
            <IconWrapper>
              <Typography variant="body1">Agent: {data.agent || 'Not Assigned'}</Typography>
            </IconWrapper>
          </Grid>
          <Grid item xs={12}>
            <IconWrapper>
              <Typography variant="body1">Subject: {data.subject || 'Not Specified'}</Typography>
            </IconWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default ContactDetails;
