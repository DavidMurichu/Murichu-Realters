import React, { useEffect, useState } from 'react';
import { Typography, Box} from '@mui/material';
import { keyframes } from '@emotion/react';
import RecentCardCustom from '../../Container/RecentCardCustom';
import { useLocation, useHistory } from 'react-router-dom';
import AgentFormsCard from './AgentForm';
import AgentPropertyCard from './AgentPropertyCard';


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


  const AgentProperties = () => {
    const [data, setData]=useState([]);
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
        <AgentPropertyCard agent={agentData} />
      
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
        <AgentFormsCard agent={agentData}/>
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
        <RecentCardCustom list={agentData.properties||[]} />
      </Box>
    </Box>
      </>
     
    );
  };
  
  export default AgentProperties;