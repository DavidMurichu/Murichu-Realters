import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { Typography, TextField, Button, Grid, MenuItem, Box, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Maincard from './maincard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Snow theme for ReactQuill

const GenericForm = ({ formData, title, fields, onSubmit, setFormData = null, isCombo = false, history_endpoint = '/' }) => {
    const [formState, setFormState] = useState(formData);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    useEffect(() => {
        setFormState(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
    
        // Handle file input
        if (type === 'file') {
            if (name === 'images') {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: Array.from(files), // Convert FileList to an array of files
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: files[0],
                }));
            }
            return;
        }
    
        const updatedValue = type === 'checkbox' ? checked : value;
    
        if (setFormData) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: updatedValue,
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: updatedValue,
            }));
        }
    };
    
    

    const debouncedEditorChange = useCallback(
        debounce((value, name) => {
            if (setFormData) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setFormState((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        }, 300), // Adjust the debounce delay as needed
        []
    );

    const handleEditorChange = (value, name) => {
        if (setFormData) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
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
        <Maincard title={title} sx={{ backgroundColor: 'background.paper', color: 'text.primary', p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {!isCombo && (
                    <IconButton color="primary" onClick={() => history.push(history_endpoint)} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                )}
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
                        <Grid item xs={12} sm={field.type === 'text-editor' ? 12 : (field.size || 6)} key={field.name}>
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: 'divider',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />
                            ) : field.type === 'text-editor' ? (
                                <Grid item xs={12} key={field.name}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle1" gutterBottom>{field.label}</Typography>
                                        <Box sx={{
                                            '& .ql-container': {
                                                borderRadius: '8px',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                overflow: 'hidden',
                                                minHeight: '200px',
                                                '& .ql-editor': {
                                                    padding: 2,
                                                },
                                            },
                                            '& .ql-toolbar': {
                                                borderBottom: '1px solid',
                                                borderColor: 'divider',
                                            },
                                        }}><ReactQuill
                                        value={formState[field.name] || ''}
                                        onChange={(value) => handleEditorChange(value, field.name)}
                                        theme="snow"
                                        placeholder={`Enter ${field.label.toLowerCase()} here...`}
                                        modules={{
                                            toolbar: [
                                                [{ header: '1' }, { header: '2' }],
                                                ['bold', 'italic', 'underline'],
                                                ['link', 'image'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['clean'],
                                            ],
                                        }}
                                        formats={[
                                            'header', 'bold', 'italic', 'underline', 'link', 'image', 'list', 'bullet'
                                        ]}
                                    />
                                    
                                        </Box>
                                        {errors[field.name] && (
                                            <Typography variant="caption" color="error">
                                                {errors[field.name]}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>
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
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            '& fieldset': {
                                                borderColor: 'divider',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                />
                            )}
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        {!isCombo && (
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Maincard>
    );
};

export default GenericForm;
