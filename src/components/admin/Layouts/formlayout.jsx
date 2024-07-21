import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, MenuItem, Box, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Maincard from './maincard';

const GenericForm = ({ formData, title, fields, onSubmit, setFormData = null, isCombo = false, history_endpoint = '/' }) => {
    const [formState, setFormState] = useState(formData);
    const [errors, setErrors] = useState({});
    const [selectedFiles, setSelectedFiles] = useState('');
    const history = useHistory();

    useEffect(() => {
        setFormState(formData);
    }, [formData]);


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const updatedValue = type === 'checkbox' ? checked : (type === 'file' ? files : value);
        if(name==='profile_image'){
            
            setFormData({
                ...formData,
                [name]:files[0]
               
            })
            return
        }
        if (setFormData) {
            setFormData({
                ...formData,
                [name]: updatedValue,
            });
        } else {
            setFormState({
                ...formState,
                [name]: updatedValue,
            });
        }

        
    };

    const validate = () => {
        let tempErrors = {};
        fields.forEach(field => {
            if (field.required && !formState[field.name]) {
                tempErrors[field.name] = `${field.label} is required`;
            }
        });
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const formDataToSend = new FormData();
                for (let key in formState) {
                    formDataToSend.append(key, formState[key]);
                }
                if (selectedFiles) {
                    Array.from(selectedFiles).forEach(file => {
                        formDataToSend.append('files', file);
                    });
                }
                await onSubmit(formDataToSend);
            } catch (error) {
                console.error(`Error adding ${title.toLowerCase()}:`, error);
                toast.error(`Failed to add ${title.toLowerCase()}`);
            }
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    return (
        <Maincard title={title} style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {
                    isCombo ? null :
                        <IconButton color="primary" onClick={() => history.push(history_endpoint)}>
                            <ArrowBackIcon />
                        </IconButton>
                }
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
                Fill in the details to {title}.
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {fields.map((field) => (
                        <Grid item xs={12} sm={field.size || 6} key={field.name}>
                            {field.type === 'select' ? (
                                <TextField
                                    fullWidth
                                    select
                                    label={field.label}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                >
                                    {field.options.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : field.type === 'file' ? (
                                <TextField
                                    fullWidth
                                    type="file"
                                    label={field.label}
                                    name={field.name}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                    InputLabelProps={{ shrink: true }}
                                />
                            ) : field.type === 'files' ? (
                                <TextField
                                    fullWidth
                                    type="file"
                                    label={field.label}
                                    name={field.name}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ multiple: true }}
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    label={field.label}
                                    name={field.name}
                                    value={formState[field.name] || ''}
                                    onChange={handleChange}
                                    required={field.required || false}
                                    type={field.type || 'text'}
                                    InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                                    multiline={field.multiline || false}
                                    rows={field.rows || 1}
                                    error={!!errors[field.name]}
                                    helperText={errors[field.name]}
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        {
                            isCombo ? null : (
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            </Box>
        </Maincard>
    );
};

export default GenericForm;
