import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Back from '../common/Back';
import Heading from '../common/Heading';
import img from '../images/about.jpg';
import { styled } from '@mui/material/styles';

const Image = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
});

const About = () => {
  return (
    <section>
      <Back name='About Us' title='About Us - Who We Are?' cover={img} />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={7}>
            <Box>
              <Heading title='Our Agency Story' subtitle='Check out our company story and work process' />
              <Typography paragraph>
                Welcome to Murichu Realtors, where dreams find their homes. Established in 2020, we have been a cornerstone in the real estate market, dedicated to providing unparalleled service and expertise. Our mission is to connect people with the perfect property that fits their needs and lifestyle.
              </Typography>
              <Typography paragraph>
                Our team of experienced professionals is committed to guiding you through every step of the buying, selling, or renting process. We believe in a personalized approach, understanding that each client is unique and deserves a tailored experience.
              </Typography>
              <Typography paragraph>
                At Murichu Realtors, we pride ourselves on our deep knowledge of the market and our unwavering dedication to customer satisfaction. We leverage cutting-edge technology and marketing strategies to ensure your property gets the visibility it deserves.
              </Typography>
              <Typography paragraph>
                Join us on this journey and discover why countless clients trust Murichu Realtors for their real estate needs. Your dream home is just a step away.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Image src='./immio.jpg' alt='Our Agency' />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default About;
