import { Button, Typography } from "@mui/material";
import TableTemplate from "../../Layouts/TableTemplate";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Maincard from "../../Layouts/maincard";
import axios from "axios";
import { BASE_URL, token } from "../../../appService/Delay";
import { useState } from "react";
import { showToast } from "../../../appService/Toast/Toast";
import ApiService from "../../../appService/data/PostData";

const PropertyTenure=()=>{

    const [refresh, setRefresh]=useState(false);
    const handleEdit=()=>{

    }

    const handleDelete = async (id) => {
      const Delete= await ApiService.delete('property-tenures', id, refresh, setRefresh);
      if(Delete){
       setRefresh(true)
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