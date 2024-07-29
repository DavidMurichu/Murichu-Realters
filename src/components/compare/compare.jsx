import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { showToast } from '../appService/Toast/Toast';
import { ToastContainer } from 'react-toastify';
import { CompareContext } from '../appService/compareService';

const StyledTable = ({ data, onRemoveProperty }) => { 

  return (
    <Container sx={{ mt: 4 }}>
      {data.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6">No properties to Compare.</Typography>
          <Link to='/listings'>
            <Typography variant="body1" sx={{ cursor: 'pointer', color: 'primary.main', mt: 2 }}>
              Browse All Properties
            </Typography>
          </Link>
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650, border: '1px solid', borderColor: 'divider' }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Cover</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Price Ksh:</TableCell>
                <TableCell>Tenure</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img src={item.property_images[0]} alt={item.property_name} style={{ width: 100, height: 100 }} />
                  </TableCell>
                  <TableCell>{item.property_name}</TableCell>
                  <TableCell>{item.property_address} {item.property_city}</TableCell>
                  <TableCell>{item.property_price}</TableCell>
                  <TableCell>{item.property_tenure}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onRemoveProperty(item.id)}>
                      <Typography variant="body2" color="error">Remove</Typography>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

StyledTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      property_images: PropTypes.arrayOf(PropTypes.string).isRequired,
      property_name: PropTypes.string.isRequired,
      property_address: PropTypes.string.isRequired,
      property_city: PropTypes.string.isRequired,
      property_description: PropTypes.string.isRequired,
      property_price: PropTypes.number.isRequired,
      property_tenure: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRemoveProperty: PropTypes.func.isRequired,
};



const Compare = () => {
  const { compare, setCompare } = useContext(CompareContext);

  const handleRemoveProperty = (propertyId) => {
    const updatedCompare = { ...compare }; // Create a copy to avoid mutation
    delete updatedCompare[propertyId]; // Remove the property from the object
    setCompare(updatedCompare);
    showToast('item removed successfully', 'success')
  };

  return (
    <Container sx={{ mt: 4 }}>
      <StyledTable data={Object.values(compare)} onRemoveProperty={handleRemoveProperty} />
      <ToastContainer style={{ zIndex: 999999999 }} />
    </Container>
  );
};

Compare.propTypes = {
  compare: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Compare;
