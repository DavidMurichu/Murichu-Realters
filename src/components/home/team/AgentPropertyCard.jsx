import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, IconButton, Tooltip } from '@mui/material';
import { Email, Phone, LocationCity, Home, WhatsApp } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import { useHistory } from 'react-router-dom';

// Define the keyframes for animation
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

const AgentPropertyCard = ({ agent }) => {
  const history = useHistory();
  if (!agent) {
    history.push('/');
  }
  const whatsappUrl = `https://wa.me/${agent.phone}`;
  const mailtoUrl = `mailto:${agent.email}`;

  return (
    <Card sx={{
      margin: '20px auto',
      padding: '20px',
      boxShadow: 3,
      borderRadius: 2,
      animation: `${fadeIn} 0.5s ease-in-out`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Avatar src={agent.profile_image} alt={agent.name} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>{agent.name}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Phone sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Email sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.email}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationCity sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.city_name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Home sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.properties_count} properties</Typography>
          </Box>
        
          <Tooltip title="Send WhatsApp Message">
            <IconButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" color="primary">
              <WhatsApp />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Email">
            <IconButton href={mailtoUrl} target="_blank" rel="noopener noreferrer" color="primary">
              <Email />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentPropertyCard;
