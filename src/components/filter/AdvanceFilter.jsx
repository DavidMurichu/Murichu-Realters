import React, { useContext, useEffect, useState, useCallback } from 'react';
import './AdvancedFilter.css';
import { InputLabel, MenuItem, Select, Grid, useMediaQuery, useTheme, TextField, Autocomplete } from '@mui/material';
import { TenureContext } from '../appService/TenureProvider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import fuzzysort from 'fuzzysort';



const getUniqueValues = (list, key) => {
  return [...new Set(list.map(item => item[key]))];
};

const fuzzySearch = (input, options) => {
  if (!input) return options;

  const results = fuzzysort.go(input, options, { key: 'label' });
  return results.map(result => result.obj);
};

const AdvanceFilter = ({ data, onFilterUpdate }) => {
  const { propertyTenure, setPropertyTenure, location, setLocation, tenures } = useContext(TenureContext);

  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState(location);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const transformedOptions = data.map((propertyinfo) => ({
      label: `${propertyinfo.property_city}, ${propertyinfo.property_address}`,
    }));
    setOptions(transformedOptions);
  }, [data]);

  const filteredOptions = fuzzySearch(inputValue, options);

  // Set initial slider values based on tenure
  const initialSliderValue = propertyTenure ===  1000000000;
  const initialPriceMin = propertyTenure ===  10000;

  const [property, setPropertyChange] = useState("");
  const [bedrooms, setBedroomsChange] = useState("");
  const [sliderValue, setSliderValue] = useState(initialSliderValue);
  const [priceMin, setPriceMin] = useState(initialPriceMin);

  const propertyTypes = getUniqueValues(data, "property_type");
  const bedrooms_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handlePropertyChange = (event) => {
    setPropertyChange(event.target.value);
  };

  const handleLocationChange = (event, newValue) => {
    const locationString = newValue ? newValue.label : "";
    const [city, address] = locationString.split(',').map(part => part.trim());
    setLocation(city); 
};

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
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

  const debounceFilterUpdate = useCallback(debounce((filters) => {
    onFilterUpdate(filters);
  }, 300), []);
 function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
useEffect(() => {
  const filterProperties = (data) => {
    return data.filter(item => {
      const matchesCategory = !propertyTenure || item.property_tenure === propertyTenure;
      const matchesType = !property || item.property_type === property;
      const matchesLocation = !location || item.property_city.toLowerCase().includes(location.toLowerCase());
      const matchesBedrooms = !bedrooms || item.property_bedrooms === parseInt(bedrooms);
      const matchesMinPrice = !priceMin || item.property_price >= priceMin;
      const matchesMaxPrice = !sliderValue || item.property_price <= sliderValue;
      
      return matchesCategory && matchesType && matchesLocation && matchesBedrooms && matchesMinPrice && matchesMaxPrice;
    });
  };

  // First attempt filtering with all filters applied
  let filtered = filterProperties(data);

  if (filtered.length === 0) {
    console.warn('No results found. Relaxing tenure filter...');
    
    // Step 1: Relax tenure filter
    filtered = data.filter(item => {
      const matchesType = !property || item.property_type === property;
      const matchesLocation = !location || item.property_city.toLowerCase().includes(location.toLowerCase());
      const matchesBedrooms = !bedrooms || item.property_bedrooms === parseInt(bedrooms);
      const matchesMinPrice = !priceMin || item.property_price >= priceMin;
      const matchesMaxPrice = !sliderValue || item.property_price <= sliderValue;

      // Ignore tenure (relaxed)
      return matchesType && matchesLocation && matchesBedrooms && matchesMinPrice && matchesMaxPrice;
    });

    // If still no results, further relax other filters
    if (filtered.length === 0) {
      console.warn('Still no results. Relaxing price range...');
      
      // Step 2: Relax price range and bedrooms
      filtered = data.filter(item => {
        const matchesType = !property || item.property_type === property;
        const matchesLocation = !location || item.property_city.toLowerCase().includes(location.toLowerCase());
        
        // Ignore tenure and relax price range
        const matchesMinPrice = item.property_price >= (priceMin * 0.8); // Relax minimum price by 20%
        const matchesMaxPrice = item.property_price <= (sliderValue * 1.2); // Relax maximum price by 20%

        // Ignore bedrooms
        return matchesType && matchesLocation && matchesMinPrice && matchesMaxPrice;
      });
      
      // As a last resort, show all properties
      if (filtered.length === 0) {
        console.warn('No results with relaxed filters. Showing all properties.');
        filtered = data; // Show all data as fallback
      }
    }
  }

  setFilteredData(filtered);
  debounceFilterUpdate(filtered);
}, [location, property, bedrooms, sliderValue, propertyTenure, priceMin, data, debounceFilterUpdate]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className="card">
      <div className='tenure-filter'>
        <ul>
        {tenures.map((tenure) => {
        const formattedName = tenure.name.charAt(0).toUpperCase() + tenure.name.slice(1);
        
        return (
          <li
            className={propertyTenure === tenure.name ? 'active' : ''}
            onClick={() => handleTenureClick(tenure.name)}
            key={tenure.name} // Add a unique key prop for each item
          >
            {tenure.name !== 'land' && <span>For </span>}
            {formattedName}
          </li>
        );
      })}

         
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
          <Autocomplete
            freeSolo
            options={inputValue ? filteredOptions : []}
            getOptionLabel={(option) => option.label}
            onChange={handleLocationChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  minWidth: {xs:'auto', sm:'300px'},
                  maxWidth: '100%',
                  margin: '1%',
                  borderRadius: '3rem',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'none',
                    },
                  },
                }}
                placeholder='Search by location'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <LocationOnIcon style={{ marginRight: '10px', color: '#27ae60' }} />
                  ),
                }}
              />
            )}
          />
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

      <Grid
        container
        direction={isSmallScreen ? 'column' : 'row'}
        className={isSmallScreen ? 'column' : 'row'}
        spacing={2}
      >
        <Grid item className='price-input'>
          <InputLabel htmlFor='min-price'>Min Price:</InputLabel>
          <TextField
            placeholder='Enter min price'
            name='min-price'
            type='number'
            value={priceMin}
            onChange={handleMinPrice}
          />
        </Grid>
        
        <Grid item className='price-input'>
          <InputLabel htmlFor='max-price'>Max Price:</InputLabel>
          <TextField
            placeholder='Enter max price'
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
