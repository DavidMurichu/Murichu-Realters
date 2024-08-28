import React, { useEffect, useState } from 'react';
import GenericForm from '../../Layouts/formlayout';
import { ToastContainer, toast } from 'react-toastify';
import { FetchData } from '../../../appService/Delay';
import AddPropertyImageForm from './AddPropertyImage';
import ApiService from '../../../appService/data/PostData';

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    property_name: '',
    property_city: '',
    property_address: '',
    property_tenure: '',
    property_type: '',
    property_bedrooms: '',
    property_price: '',
    agent: '',
    features: '' // Initialize as an empty string
  });

  const [cities, setCities] = useState([]);
  const [property_types, setProperty_types] = useState([]);
  const [property_tenures, setProperty_tenures] = useState([]);
  const [agents, setAgents] = useState([]);
  const [propertyData, setPropertyData] = useState(null);

  const handleSubmit = async (event) => {
    
    try {
      console.log('data', formData);
      const token = localStorage.getItem('access_token');
      console.log('local token', token);
      
  
      const response= await ApiService.post('properties', formData);

      console.log('response property', response);
      if (response.status === 201) {
        toast.success("Property added successfully");
        setPropertyData(response.data);
      } else {
        toast.error("Contact admin");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errors[key].forEach((message) => {
              toast.error(`${key}: ${message}`);
            });
          }
        }
      } else {
        toast.error('Failed to add property');
      }
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await FetchData('locations', setCities);
      await FetchData('property-types', setProperty_types);
      await FetchData('property-tenures', setProperty_tenures);
      await FetchData('agents', setAgents);
    };
  
    fetch();
  }, []);

  const propertyFields = [
    { name: 'property_name', label: 'Property Name', type: 'text', required: true },
    { name: 'property_city', label: 'Property City', type: 'select', 
      options: cities.map(location => ({ value: location.id, label: location.city })),
      required: true },
    { name: 'property_address', label: 'Property Address', type: 'text', required: true },
    { name: 'property_type', label: 'Property Type', type: 'select', 
      options: property_types.map(type => ({ value: type.id, label: type.name })),
      required: true },
    { name: 'property_bedrooms', label: 'Number of Bedrooms', type: 'number', required: true },
    { name: 'property_tenure', label: 'Property Tenure', type: 'select', 
      options: property_tenures.map(tenure => ({ value: tenure.id, label: tenure.name })),
      required: true },
    { name: 'property_price', label: 'Property Price', type: 'number', required: true },
    { name: 'agent', label: 'Agent', type: 'select', 
      options: agents.map(agent => ({ value: agent.id, label: agent.name })),
      required: true },
    { name: 'features', label: 'Property Features', type: 'text-editor', required: true },
    { name: 'property_description', label: 'Property Description', type: 'text-editor', required: true },
  ];

  return (
    <>
      {propertyData ? (
        <AddPropertyImageForm data={propertyData} />
      ) : (
        <GenericForm
          fields={propertyFields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          title={'Add Property'}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default AddPropertyForm;
