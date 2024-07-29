import React, { useState } from 'react';
import img from '../images/pricing.jpg';
import Back from '../common/Back';
import { Container, Typography, TextField, Button, Box, FormHelperText } from '@mui/material';
import { styled } from '@mui/system';

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
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Submit form logic here
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
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
      </section>
    </>
  );
};

export default Contact;
