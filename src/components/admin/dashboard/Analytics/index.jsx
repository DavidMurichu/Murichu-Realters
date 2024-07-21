// material-ui

import Grid from '@mui/material/Grid';



// project import


import { Events } from './info';


// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
    return (
        <Grid container spacing={2.75}>
            <Events 
            title='Location management' 
            viewlink={'/admin/city'}
            addlink={'/admin/add-city'}
            />
            <Events 
            title='Tenure management'
            viewlink={'/admin/property-tenures'}
            addlink={'/admin/add-property-tenures'}
            
            
            />
            <Events 
            title='Property type management'
            viewlink={'/admin/property-types'}
            addlink={'/admin/add-property-types'}
            />
             <Events 
            title='Agent management'
            viewlink={'/admin/agents'}
            addlink={'/admin/add-agents'}
            />
          
        </Grid>
    );
}
