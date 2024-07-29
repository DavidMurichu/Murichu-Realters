import React, { useContext, useEffect, useState } from 'react';
import './AdvancedFilter.css';
import { InputLabel, MenuItem, Select, Grid, useMediaQuery, useTheme, TextField, Autocomplete, Slider, Box } from '@mui/material';
import { TenureContext } from '../appService/TenureProvider';
import { styled } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    '& fieldset': {
      borderColor: '#27ae60',
    },
    '&:hover fieldset': {
      borderColor: '#27ae60',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#27ae60',
    },
  },
});
const getUniqueValues = (list, key) => {
  return [...new Set(list.map(item => item[key]))];
};

const AdvanceFilter = ({ data, onFilterUpdate }) => {
  const { propertyTenure, setPropertyTenure,location, setLocation } = useContext(TenureContext);
  const [options, setOptions]=useState([]);
  
  useEffect(() => {
    const transformedOptions = data.map((propertyinfo) => ({
      label: `${propertyinfo.property_city}, ${propertyinfo.property_address}`,
    }));
    setOptions(transformedOptions);
  }, [data]);
  

  // Set initial slider values based on tenure
  const initialSliderValue = propertyTenure === 'buy' ? 1000000000 : 100000;
  const initialPriceMin = propertyTenure === 'buy' ? 500000 : 10000;
  
  // const [location, setLocation] = useState("");
  const [property, setPropertyChange] = useState("");
  const [bedrooms, setBedroomsChange] = useState("");
  const [sliderValue, setSliderValue] = useState(initialSliderValue);
  const [priceMin, setPriceMin] = useState(initialPriceMin);

  const propertyTypes = getUniqueValues(data, "property_type");
  const locations = getUniqueValues(data, "property_city");
  const bedrooms_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePropertyChange = (event) => {
    setPropertyChange(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  

  const handleTenureClick = (tenure) => {
    setPropertyTenure(tenure);
    // Update slider values based on tenure
    if (tenure === 'buy') {
      setSliderValue(1000000000);
      setPriceMin(500000);
    } else if (tenure === 'rent') {
      setSliderValue(100000);
      setPriceMin(10000);
    }
  };

  const handleMinPrice = (event) => {
    setPriceMin(parseInt(event.target.value));
  };

  const handleMaxPrice = (event) => {
    setSliderValue(parseInt(event.target.value));
  };

  const handleBedroomsChange = (event) => {
    setBedroomsChange(event.target.value);
  };

  useEffect(() => {
    const filtered = data.filter(item => {
      const matchesCategory = !propertyTenure || item.property_tenure === propertyTenure;
      const matchesType = !property || item.property_type === property;
      const matchesLocation = !location || item.property_city.toLowerCase().includes(location.toLowerCase());
      const matchesBedrooms = !bedrooms || item.property_bedrooms === parseInt(bedrooms);
      const matchesMinPrice = !priceMin || item.property_price >= priceMin;
      const matchesMaxPrice = !sliderValue || item.property_price <= sliderValue;
      return matchesCategory && matchesType && matchesLocation && matchesBedrooms && matchesMinPrice && matchesMaxPrice;
    });

    onFilterUpdate(filtered);
  }, [location, property, bedrooms, sliderValue, propertyTenure, priceMin, data, onFilterUpdate]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  
  return (
    <div className="card">
      <div className='tenure-filter'>
        <ul>
          <li
            className={propertyTenure === 'rent' ? 'active' : ''}
            onClick={() => handleTenureClick('rent')}
          >
            For Rent
          </li>
          <li
            className={propertyTenure === 'buy' ? 'active' : ''}
            onClick={() => handleTenureClick('buy')}
          >
            For Sale
          </li>
          <li
            className={propertyTenure === 'land' ? 'active' : ''}
            onClick={() => handleTenureClick('land')}
          >
            Land
          </li>
        </ul>
      </div>
     
      <Grid
        className="dropdown-container"
        container
        direction={isSmallScreen ? 'column' : 'row'}
        spacing={2}
      >
        <Grid item>
          <Select
            value={property}
            onChange={handlePropertyChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">
              Select Property type
            </MenuItem>
            {propertyTypes.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item>
          {/* <Select
            value={location}
            onChange={handleLocationChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Location</em>
            </MenuItem>
            {locations.map((location, index) => (
              <MenuItem key={index} value={location}>{location}</MenuItem>
            ))}
          </Select> */}
         
        </Grid>

        <Grid item>
          <Select
            value={bedrooms}
            onChange={handleBedroomsChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">
              No of Bedrooms
            </MenuItem>
            {bedrooms_data.map((bedroom, index) => (
              <MenuItem key={index} value={bedroom}>
                {bedroom}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
        <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField
          {...params}
  
          sx={{
            margin:'1%',
             borderRadius:'2rem',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black',
            },
            
            '&.Mui-focused fieldset': {
              borderColor: 'black',
            },
          },
          }}
          placeholder='Search by location'
          InputProps={{
            startAdornment: (
                <LocationOnIcon style={{ marginRight: '10px', color: '#27ae60' }} />
            ),
        }}
          />
  
          }
        
        >
        </Autocomplete>  
        
      </Grid>
      </Grid>

      <Grid
        container
        direction={isSmallScreen ? 'column' : 'row'}
        className={isSmallScreen ? 'column' : 'row'}
        spacing={2}
      >
        <Grid item className='price-input'>
          <InputLabel htmlFor='min-price'>Min Price:</InputLabel>
          <TextField
            name='min-price'
            type='number'
            value={priceMin}
            onChange={handleMinPrice}
          />
        </Grid>
        
        <Grid item className='price-input'>
          <InputLabel htmlFor='max-price'>Max Price:</InputLabel>
          <TextField
            name='max-price'
            type='number'
            value={sliderValue}
            onChange={handleMaxPrice}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AdvanceFilter;
