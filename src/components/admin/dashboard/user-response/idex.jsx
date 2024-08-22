import React, { useEffect, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { DeleteData, FetchData, PostData } from '../../../appService/Delay'; 
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';

const SmallButton = styled(Button)({
  fontSize: '0.75rem', 
  padding: '4px 8px',  
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 'calc(100vh - 150px)', 
  overflowY: 'auto', 
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  gap: '8px', 
  alignItems: 'center', 
});

const UserResponses = () => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [open, setOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    email_from: '',
    email: ''
  });

  const getResponse = async () => {
    await FetchData('user-responses', setResponses, setLoading);
  };

  const handleSendMessage = (response) => {
    setFormData({
      ...formData,
      email: response.email, // Set email to user response email
    });
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      subject: '',
      message: '',
      email_from: '',
      email: ''
    });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async() => {
    // Logic to send the message using formData
    const response= await PostData('send-email/', formData, true);
    console.log('succcc', response);
    if(response.status===200){
        toast.success('email sent successfully')
    }
    handleClose();
  };

  const handleViewMore = (response) => {
    alert(`Viewing details for ${response.name}`);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this response?");
    if (confirm) {
      setLoading(true);
      try {
        const response=await DeleteData('user-responses', id)
        if(response===true){
            setResponses((prevResponses) => prevResponses.filter(response => response.id !== id));
            toast.success('deleted')
        }else{
            toast.error('delete failed')
        }
       
      } catch (error) {
        alert('Error deleting response');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getResponse();
  }, []); 

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Property Name</TableCell>
              <TableCell>Agent</TableCell>
              <TableCell >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((response, index) => (
              <TableRow key={response.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{response.name}</TableCell>
                <TableCell>{response.phonenumber}</TableCell>
                <TableCell>{response.email}</TableCell>
                <TableCell>{response.message}</TableCell>
                <TableCell>{response.property_name || 'N/A'}</TableCell>
                <TableCell>{response.agent || 'N/A'}</TableCell>
                <TableCell>
                  <ButtonContainer>
                    <SmallButton 
                      variant="contained" 
                      color="primary" 
                      onClick={() => handleSendMessage(response)}
                    >
                      Message
                    </SmallButton>
                    <SmallButton 
                      variant="contained" 
                      color="secondary" 
                      onClick={() => handleViewMore(response)}
                    >
                      View More
                    </SmallButton>
                    <SmallButton 
                      variant="contained" 
                      color="error" 
                      onClick={() => handleDelete(response.id)}
                    >
                      Delete
                    </SmallButton>
                  </ButtonContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ToastContainer/>
      </StyledTableContainer>

      {/* Modal for Sending Message */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            margin="dense"
            label="From (Name)"
            name="email_from"
            value={formData.email_from}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="To (Email)"
            name="email"
            value={formData.email}
            disabled
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>

  );
};

export default UserResponses;
