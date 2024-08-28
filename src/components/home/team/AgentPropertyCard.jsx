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
      maxWidth: '100%',
      
      '@media (max-width: 600px)': {
        padding: '10px',
      },
    }}>
      <Avatar src={agent.profile_image} alt={agent.name} sx={{ width: 80, height: 80, marginBottom: 2, '@media (max-width: 600px)': { width: 60, height: 60 } }} />
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: 1, fontSize: '1.2rem', '@media (max-width: 600px)': { fontSize: '1rem' } }}>{agent.name}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Phone sx={{ marginRight: 1 }} />
            <Typography variant="body2" sx={{ fontSize: '0.9rem', '@media (max-width: 600px)': { fontSize: '0.8rem' } }}>{agent.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Email sx={{ marginRight: 1 }} />
            <Typography variant="body2" sx={{ fontSize: '0.9rem', '@media (max-width: 600px)': { fontSize: '0.8rem' } }}>{agent.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <LocationCity sx={{ marginRight: 1 }} />
            <Typography variant="body2" sx={{ fontSize: '0.9rem', '@media (max-width: 600px)': { fontSize: '0.8rem' } }}>{agent.city_name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
            <Home sx={{ marginRight: 1 }} />
            <Typography variant="body2" sx={{ fontSize: '0.9rem', '@media (max-width: 600px)': { fontSize: '0.8rem' } }}>{agent.properties_count} properties</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="Send WhatsApp Message">
            <IconButton href={whatsappUrl} target="_blank" rel="noopener noreferrer" color="primary" sx={{ fontSize: '1.5rem', '@media (max-width: 600px)': { fontSize: '1.2rem' } }}>
              <WhatsApp />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Email">
            <IconButton href={mailtoUrl} target="_blank" rel="noopener noreferrer" color="primary" sx={{ fontSize: '1.5rem', '@media (max-width: 600px)': { fontSize: '1.2rem' } }}>
              <Email />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AgentPropertyCard;
