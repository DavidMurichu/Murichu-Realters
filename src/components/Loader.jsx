// src/components/LoadingSpinner.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

// Define the spin animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define the pulse animation
const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '10px solid #27ae60',
            borderTop: '10px solid transparent',
            animation: `${spin} 1s linear infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '10px solid rgba(0, 0, 0, 0.1)',
            animation: `${pulse} 1.5s infinite`,
          }}
        />
      </Box>
      
    </Box>
  );
};

export default LoadingSpinner;
