import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './compare.css'; // Import your CSS file
import { CompareContext } from '../appService/compareService';
import { Link } from 'react-router-dom';
import { showToast } from '../appService/Toast/Toast';
import { ToastContainer } from 'react-toastify';

const StyledTable = ({ data, onRemoveProperty }) => { 
  return (
    data.length === 0 ? (
      <div className="bordered-table no-data">
        <p>No properties to Compare.</p>
        <Link to='/listings'>
          <button>Browse All Properties</button>
        </Link>
      </div>
    ) : (
      <table className=" bordered-table table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cover</th>
            <th>Name</th>
            <th>Location</th>
            <th>Category</th>
            <th>Price</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td><img src={item.cover} alt={item.name} style={{ width: 100, height: 100 }} /></td>
              <td>{item.name}</td>
              <td>{item.address} {item.city}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.type}</td>
              <td>
                <button onClick={() => onRemoveProperty(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

StyledTable.propTypes = {
  data: PropTypes.arrayOf(
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
    <section className="compare-section">
      <StyledTable data={Object.values(compare)} onRemoveProperty={handleRemoveProperty} />
      <ToastContainer style={{zIndex:999999999}}/>
    </section>
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
