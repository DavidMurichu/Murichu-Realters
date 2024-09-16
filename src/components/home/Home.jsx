import React, { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import LoadingSpinner from '../Loader';


const Hero = lazy(() => import('./hero/Hero'));
const Featuredlink = lazy(() => import('./FeatureLink'));
const Location = lazy(() => import('./location/Location'));
const Team = lazy(() => import('./team/Team'));

const Home = () => {
  return (
    <Box>
      <Suspense fallback={<LoadingSpinner message="Loading..." />}>
        <Hero />
        <Featuredlink />
        <Location />
        <Team />
      </Suspense>
    </Box>
  );
};

export default Home;
