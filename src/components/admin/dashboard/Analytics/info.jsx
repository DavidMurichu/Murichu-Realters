import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import Maincard from '../../Layouts/maincard';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';




const Events = ({title, addlink, viewlink} ) => {
    return (
        <Grid item xs={12} md={5} lg={4}>
            <Maincard sx={{ mt: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>{title}</Typography>
                    <Grid>
                        <Button
                        color='primary'
                        variant='contained'
                        sx={{ mr: 1 }}
                        component={Link}
                        to={addlink}
                        >
                            Add
                        </Button>
                        <Button
                        color='primary'
                        variant='contained'
                        sx={{ mr: 1 }}
                        component={Link}
                        to={viewlink}
                        >
                            view
                        </Button>
                    </Grid>
                    
                </Box>
            </Maincard>
        </Grid>
    );
};

export { Events };
