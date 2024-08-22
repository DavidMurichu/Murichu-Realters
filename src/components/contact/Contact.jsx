import React, { useState } from 'react';
import img from '../images/pricing.jpg';
import Back from '../common/Back';
import { Container, Typography, TextField, Button, Box, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';
import { PostData } from '../appService/Delay';
import { ToastContainer, toast } from 'react-toastify';

const FormContainer = styled(Box)`
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phonenumber: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phonenumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formValues.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formValues.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }
    if (!formValues.phonenumber.trim()) {
      newErrors.phonenumber = 'Phone number is required';
      isValid = false;
    }

    if (!formValues.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const response = await PostData('user-responses/', formValues);
        console.log('response status', response)
        if (response['status']===201) {
          toast.success('Message sent successfully');
        } else {
          toast.error('Failed to send message');
        }
      } catch (error) {
        console.log('error', error);
        toast.error('An error occurred while sending the message');
      }
      
      console.log('Form Submitted:', formValues);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support' cover={img} />
        <Container>
          <FormContainer>
            <Typography variant="h4" gutterBottom>
              Fill Up The Form
            </Typography>
            <form noValidate autoComplete="on" onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  type='number'
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  name="phonenumber"
                  value={formValues.phonenumber}
                  onChange={handleChange}
                  error={!!errors.phonenumber}
                  helperText={errors.phonenumber}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Subject"
                  variant="outlined"
                  margin="normal"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                />
              </Box>
              <Button
                variant="contained"
                style={{ background: '#27ae60' }}
                fullWidth
                type="submit"
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </FormContainer>
        </Container>
        <ToastContainer style={{zIndex:2}}/>
      </section>
    </>
  );
};

export default Contact;
