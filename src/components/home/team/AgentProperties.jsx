import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, IconButton, Tooltip, Grid, TextField, Button } from '@mui/material';
import { Email, Phone, LocationCity, Home, WhatsApp } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import RecentCardCustom from '../../Container/RecentCardCustom';
import { FetchData } from '../../appService/Delay';
import { useLocation, useHistory } from 'react-router-dom';


const agent = {
  id: 1,
  name: "David Murichu",
  phone: "0111204383",
  email: "davidmurichuz2@gmail.com",
  profile_image: "https://danilo6789bhh.pythonanywhere.com/media/agentimages/4.jpg",
  city: 1,
  city_name: "Nairobi",
  properties_count: 2
};

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

const AgentCard = () => {
    const whatsappUrl = `https://wa.me/${agent.phone}`;
    const mailtoUrl = `mailto:${agent.email}`;
  
    return (
      <Card sx={{ 
        // maxWidth: 600, 
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
        <CardContent sx={{ textAlign: 'center'}}>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>{agent.name}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
            <Phone sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
            <Email sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
            <LocationCity sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.city_name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
            <Home sx={{ marginRight: 1 }} />
            <Typography variant="body1">{agent.properties_count} properties</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
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
            <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: 'center', width: '80%' }}>
              {submitted ? 'Submitted' : 'Contact us'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  


  const AgentProperties = () => {
    const [data, setData]=useState([]);
    const [loading, setLoading]=useState(true);
    const location=useLocation();
    const history=useHistory()

    const agentData=location.state?.data;
    useEffect(() => {
      
        if (!agentData) {
          history.push('/');
        } else {
            console.log('agent__', agentData.properties)
          setData(agentData)
        }
      }, [agentData]);
    


    return (
        <>
      <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }}  alignItems='center'  >
        <AgentCard />
        {/* <FormCard /> */}
      </Box>
      <Box
      display='flex'
      flexDirection={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'center', md: 'flex-start' }}
      justifyContent='center'
      p={{ xs: 2, md: 3 }}
      m={{ xs: 1, md: 2 }}
      gap={{ xs: 2, md: 4 }} // Adds space between FormCard and RecentCardCustom
    >
      <Box flexBasis={{ xs: '100%', md: '20%' }} flexGrow={{ xs: 1, md: 0 }}>
        <FormCard />
      </Box>
      <Box flexBasis={{ xs: '100%', md: '80%' }} flexGrow={{ xs: 1, md: 1 }} alignItems='center'>
        <Typography
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            mb: 2, // Adds margin-bottom for spacing
          }}
        >
          Recent Added Properties
        </Typography>
        <RecentCardCustom list={data.properties||[]} />
      </Box>
    </Box>
      </>
     
    );
  };
  
  export default AgentProperties;