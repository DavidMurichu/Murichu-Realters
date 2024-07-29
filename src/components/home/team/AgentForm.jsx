import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

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

const FormCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    else if (!/^[0-9]+$/.test(formData.phone)) newErrors.phone = 'Invalid phone number';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <Card sx={{ 
      maxWidth: 600, 
      margin: '20px auto', 
      padding: '20px', 
      boxShadow: 3, 
      borderRadius: 2, 
      animation: `${fadeIn} 0.5s ease-in-out` 
    }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom sx={{ textAlign: 'center' }}>
          Contact Us
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Name" 
            fullWidth 
            required 
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField 
            label="Phone" 
            fullWidth 
            required 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField 
            label="Email" 
            fullWidth 
            required 
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField 
            label="Message" 
            fullWidth 
            required 
            multiline 
            rows={4} 
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '50%' }}>
            {submitted ? 'Submitted' : 'Submit'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCard;
