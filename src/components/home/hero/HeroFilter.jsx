import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FetchData } from '../../appService/Delay';
import { useHistory } from 'react-router-dom';
import { TenureContext } from '../../appService/TenureProvider';

// Sample properties data

const HeroFilter = () => {
    const [properties, SetProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProperties, setFilteredProperties] = useState([]);
    const { propertyTenure, setPropertyTenure } = useContext(TenureContext);

    const history = useHistory();

    const fetch = async () => {
        await FetchData('get-properties', SetProperties, setLoading);
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        // Filter properties based on search term
        const filtered = properties
            .filter(property =>
                property.property_city.toLowerCase().includes(term) || 
                property.property_address.toLowerCase().includes(term)
            )
            .sort((a, b) => a.property_city.localeCompare(b.property_city));

        setFilteredProperties(filtered);
        console.log(filteredProperties)
    };

    const handleRemoveProperty = (id) => {
        setFilteredProperties((prevProperties) =>
            prevProperties.filter((property) => property.id !== id)
        );
    };

   
    const handleItemClick = async (payload, path) => {
        if (payload) {
          await setPropertyTenure(payload);
        }
        history.push(path);
      };
    const handleDisplay = (val) => {
        history.push({
          pathname: `/property-details/${val.id}`,
          state: { property: val },
        });
      };
    
    return (
        <>
            <Container className="search-container" style={{background:'none', padding: '16px' }}>
                <Box className="search-box" display="flex" flexDirection={{ xs: 'column', sm: 'row' }}  justifyContent="center"
                
                
                >
                    <TextField 
                        sx={{background:'#fff', border:'none', height:'10%'}}
                        className="location-input"
                        placeholder="Search by location"
                        InputProps={{
                            startAdornment: (
                                <LocationOnIcon style={{ marginRight: '10px', color: '#27ae60' }} />
                            ),
                        }}
                        style={{ width: '100%', maxWidth: '500px', marginBottom: { xs: '16px', sm: '0' } }}
                        variant="outlined"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Box className="buttons-container" padding={1} display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
                        <Button variant="contained" color="primary" sx={{ marginBottom: { xs: '8px', sm: '0' }, marginRight: { sm: '8px' }, background: 'green' }}
                        onClick={()=>handleItemClick('buy', 'listings')}
                        
                        >Buy</Button>
                        <Button variant="contained" color="secondary" sx={{ background: 'green' }}
                        onClick={()=>handleItemClick('rent', 'listings')}
                        
                        >Rent</Button>
                    </Box>
                </Box>
                {searchTerm !== '' &&
                <Container style={{ backgroundColor: '#fff', position: 'relative', zIndex: 2 }}>
                    <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {filteredProperties.length > 0 ? (
                            <List>
                                {filteredProperties.map((property) => (
                                    <ListItem
                                    onClick={() => handleDisplay(property)}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onKeyUp={(e) => e.stopPropagation()}
                                    onKeyPress={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={0}
                                    key={property.id}
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderBottom: '1px solid #ddd',
                                        padding: '10px',
                                        '&:last-child': {
                                            borderBottom: 'none',
                                        },
                                        flexDirection: { xs: 'row', sm: 'row' }
                                    }}
                                >
                                        <Box
                                            sx={{
                                                flexShrink: 0,
                                                width: { xs: '80px', sm: '80px' },
                                                height: { xs: '80px', sm: '80px' },
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                                mr: { xs: 2, sm: 2 }
                                            }}
                                        >
                                            <img
                                                src={property.property_images[0]}
                                                alt={property.property_name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" component="div" style={{color:'black'}}>
                                                {property.property_city}<br />
                                                {property.property_address}
                                            </Typography>
                                            <Typography variant="subtitle1" color='black'>
                                                Ksh: {property.property_price}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} sx={{ ml: 2 }}>
                                            
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleDisplay(property)}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Container className='search-container' style={{ backgroundColor: '#fff', position: 'relative', zIndex: 2 }}>
                                <Typography variant="body1" style={{ color: 'black' }}>
                                    No properties found.
                                </Typography>
                            </Container>
                        )}
                    </Box>
                </Container>
            }
            </Container>
            
        </>
    );
};

export default HeroFilter;
