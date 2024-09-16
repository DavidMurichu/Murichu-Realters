import React, {useState } from 'react';
import { Card, CardContent, Typography, Box,TextField, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import { PostData } from '../../appService/Delay';
import { toast } from 'react-toastify';



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


  const AgentFormsCard = ({agent}) => {
    const [formData, setFormData] = useState({
      agent:agent.id,
      name: '',
      phonenumber: '',
      email: '',
      message: '',
      subject:''
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
      if (!formData.phonenumber) newErrors.phonenumber = 'Phonenumber is required';
      else if (!/^[0-9]+$/.test(formData.phonenumber)) newErrors.phonenumber = 'Invalid phonenumber number';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) newErrors.email = 'Invalid email address';
      if (!formData.message) newErrors.message = 'Message is required'; 
      if (!formData.subject) newErrors.subject = 'Subject is required';
      return newErrors;
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        formData.agent=agent.id
        console.log(formData, 'with', agent);
        try {
          const response = await PostData('user-responses/', formData);
          console.log('response status', response)
          if (response['status']===201) {
            setSubmitted(true);
            setFormData({
              name: '',
              phonenumber: '',
              email: '',
              message: '',
              subject:''
            });
            setErrors({});
            toast.success('Message sent successfully');
          } else {
            toast.error('Failed to send message');
          }
        } catch (error) {
          console.log('error', error);
          toast.error('An error occurred while sending the message');
        }
      }
    };
  
    return (
      <Card sx={{ 
        maxWidth: 300, 
        margin: '10px auto', 
        padding: '10px', 
        boxShadow: 3, 
        borderRadius: 2, 
        animation: `${fadeIn} 0.5s ease-in-out`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <CardContent sx={{ width: '100%' }}>
          <Typography variant="body2" component="div" gutterBottom sx={{ textAlign: 'center', marginBottom: 2 }}>
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
              label="Phonenumber" 
              fullWidth 
              required 
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              error={!!errors.phonenumber}
              helperText={errors.phonenumber}
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
              label="Subject" 
              fullWidth 
              required 
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={!!errors.subject}
              helperText={errors.subject}
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
            <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '80%' }}>
             Contact us
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  

  export default AgentFormsCard