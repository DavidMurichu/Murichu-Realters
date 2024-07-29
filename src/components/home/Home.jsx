import React, { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import LoadingSpinner from '../Loader';
import { Delay } from '../appService/Delay';



const Hero = lazy(() => import('./hero/Hero'));

const Featuredlink = lazy(() => import('./FeatureLink'));

const Location = lazy(() => import('./location/Location'));


const Team = lazy(() => import('./team/Team'));

const Home = () => {
  return (
    <Box>
      <Suspense fallback={<LoadingSpinner  />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Featuredlink />
      </Suspense>
      <Suspense fallback={<LoadingSpinner  />}>
        <Location />
      </Suspense>
      <Suspense fallback={<LoadingSpinner message="Loading Team..." />}>
        <Team />
      </Suspense>
     

    </Box>
  );
};

export default Home;
