import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Autocomplete, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FetchData } from '../../appService/Delay';
import { useHistory } from 'react-router-dom';
import { TenureContext } from '../../appService/TenureProvider';
import { useLoading } from '../../appService/Loading';

const HeroFilter = () => {
    const [properties, setProperties] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);
    const { setPropertyTenure, setLocation, tenures } = useContext(TenureContext);
    const {showLoading, hideLoading}=useLoading();

    const history = useHistory();

    const fetch = async () => {
        await FetchData('get-properties', setProperties, showLoading,hideLoading);
    };

   
    useEffect(() => {
        fetch();
    }, []);

    // HeroFilter handleSearchChange
const handleSearchChange = (event, newValue) => {
    const term = newValue.toLowerCase();
    setInputValue(newValue);
    const city = newValue.split(',')[0].trim(); // Assuming city is always first
    setLocation(city); // Update location in context
    
    const filtered = properties
        .filter(property =>
            property.property_city.toLowerCase().includes(term) || 
            property.property_address.toLowerCase().includes(term)
        )
        .sort((a, b) => a.property_city.localeCompare(b.property_city));
    
    setFilteredProperties(filtered);
};

    

    const handleItemClick = async (payload, path) => {
        if (payload) {
            await setPropertyTenure(payload);
        }
        history.push(path);
    };

    return (
        <>
            <Container className="search-container" style={{ background: 'none', padding: '16px' }}>
                <Box className="search-box" display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center">
                    <Autocomplete
                        sx={{
                            background: '#fff',
                            border: 'none',
                            width: { xs: '100%', sm: '500px' },
                            marginBottom: { xs: '16px', sm: '0' },
                            maxHeight:'10%'
                        }}
                        options={inputValue ? filteredProperties.map((property) => `${property.property_city}, ${property.property_address}`) : []}
                        freeSolo
                        onInputChange={handleSearchChange}
                        noOptionsText={inputValue === '' ? 'No options' : 'No matching properties'}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                placeholder="Search by location"
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <LocationOnIcon style={{ marginRight: '10px', color: '#27ae60' }} />
                                    ),
                                }}
                                variant="outlined"
                            />
                        )}
                    />
                    <Box className="buttons-container" padding={1} display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                        {tenures.map((tenure)=>(
                            <Button key={tenure.id} variant="contained" sx={{
                                marginBottom: { xs: '8px', sm: '0' },
                                marginRight: { sm: '8px' }, 
                                background: 'green',
                                '&:hover': {
                                    background: '#fff',
                                    color: '#000'
                                }
                            }}
                            onClick={() => handleItemClick(tenure.name, 'listings')}
                            >
                                {tenure.description}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default HeroFilter;
