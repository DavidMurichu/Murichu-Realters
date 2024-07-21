import React, { useContext, useEffect, useState } from 'react';
import './AdvancedFilter.css';
import { InputLabel, MenuItem, Select, Grid, useMediaQuery, useTheme, TextField, Typography, Slider } from '@mui/material';
import { TenureContext } from '../appService/TenureProvider';

const getUniqueValues = (list, key) => {
  return [...new Set(list.map(item => item[key]))];
};

const AdvanceFilter = ({ data, onFilterUpdate }) => {
  const [location, setLocationChange] = useState("");
  const [property, setPropertyChange] = useState("");
  const [bedrooms, setBedroomsChange] = useState("");
  const [sliderValue, setSliderValue] = useState(50000000);
  const { propertyTenure, setPropertyTenure } = useContext(TenureContext);
  const [priceMin, setPriceMin] = useState(10000);

  const propertyTypes = getUniqueValues(data, "property_type");
  const locations = getUniqueValues(data, "property_city");
  const bedrooms_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePropertyChange = (event) => {
    setPropertyChange(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationChange(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    
  };

  const handleTenureClick = (tenure) => {
    setPropertyTenure(tenure);
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
    console.log('Filtering with:', {
      propertyTenure, property, location, bedrooms, priceMin, sliderValue
    });
  if(propertyTenure==='buy'){
    setSliderValue(1000000000);
    setPriceMin(500000)
  }
  if(propertyTenure==='rent'){
    setSliderValue(100000);
    setPriceMin(10000)
  }

    const filtered = data.filter(item => {
      const matchesCategory = !propertyTenure || item.property_tenure === propertyTenure;
      const matchesType = !property || item.property_type === property;
      const matchesLocation = !location || item.property_city === location;
      const matchesBedrooms = !bedrooms || item.property_bedrooms === parseInt(bedrooms);
      const matchesMinPrice = !priceMin || item.property_price >= priceMin;
      const matchesMaxPrice = !sliderValue || item.property_price <= sliderValue;
      return matchesCategory && matchesType && matchesLocation && matchesBedrooms && matchesMinPrice && matchesMaxPrice;
    });

    console.log('Filtered list:', filtered);
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
          <Select
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
          </Select>
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
      </Grid>

      <div className="">
        <Typography
          variant={isSmallScreen ? "body2" : "body1"}
          className="slider-value"
        >
          Price: Ksh {priceMin} - {sliderValue}
        </Typography>

        <Slider
          min={20000}
          max={1000000000}
          value={sliderValue}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          className="size-slider"
          style={{ width: isSmallScreen ? '100%' : '50%' }}
        />
      </div>
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
