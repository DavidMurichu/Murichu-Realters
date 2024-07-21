import { Button, Typography } from "@mui/material";
import TableTemplate from "../../Layouts/TableTemplate";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Maincard from "../../Layouts/maincard";
import axios from "axios";
import { BASE_URL } from "../../../appService/Delay";
import { useState } from "react";
import { showToast } from "../../../appService/Toast/Toast";

const PropertyTenure=()=>{

    const [refresh, setRefresh]=useState(false);
    const handleEdit=()=>{

    }

    const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`${BASE_URL}/property-tenures/${id}/`, {
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            },
          });
    
          if (response.status === 204) {
            showToast('Image deleted successfully', 'success');
            setRefresh(!refresh)
          } else {
            showToast('Failed to delete image', 'error');
          }
        } catch (error) {
          showToast('Error deleting image', 'error');
          console.error('Error deleting image:', error);
        }
      };



    const columns=[
        {field: 'name', headerName: 'Property Tenure'}
    ];

    const buttons = [
        { label: 'Edit', color: 'primary', handleFunction: handleEdit },
        { label: 'Delete', color: 'error', handleFunction: handleDelete },
    ];
    const endpoint='property-tenures'
    return(
        <Maincard>
         <Typography variant="body1" gutterBottom>
                Welcome to Property Tenure Management. Here you can manage property Tenure.
            </Typography>

            {/* Button for adding new administrative charge */}
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/admin/add-property-tenures"
                sx={{ mr: 1 }}
            >
                Add Property Tenure
            </Button>
            <TableTemplate
                refresh={refresh}
                buttons={buttons}
                columns={columns}
                endpoint={endpoint}
                handleDelete={handleDelete}
            />
           
        
        </Maincard>
    );
}


export default PropertyTenure;