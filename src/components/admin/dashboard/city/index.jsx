import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Maincard from "../../Layouts/maincard";
import TableTemplate from "../../Layouts/TableTemplate";
import ApiService from "../../../appService/data/PostData";

const City = () => {
  const [refresh, setRefresh]=useState(false);
    
  const handleEdit = (id) => {
    // Handle edit functionality
    console.log("Editing city with ID:", id);
  };

  const handleDelete = async (id) => {
   const Delete= await ApiService.delete('locations', id, refresh, setRefresh);
   if(Delete){
    setRefresh(true)
   }
  };

  const columns = [
    { field: "city", headerName: "City Name" },
    { field: "id", headerName: "ID" }, // Add ID column if needed
  ];

  const buttons = [
    { label: "Edit", color: "primary", handleFunction: handleEdit },
    { label: "Delete", color: "error", handleFunction: handleDelete },
  ];

  const endpoint = "locations"; // API endpoint to fetch city data

  return (
    <Maincard>
      <Typography variant="body1" gutterBottom>
        Welcome to the City Management page. Here you can manage cities and their actions.
      </Typography>

      {/* Button for adding new city */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/admin/add-city"
        sx={{ mr: 1 }}
      >
        Add City
      </Button>

      {/* Table displaying cities */}
      <TableTemplate
        refresh={refresh}
        buttons={buttons}
        columns={columns}
        endpoint={endpoint}
      />

    </Maincard>
  );
};

export default City;
