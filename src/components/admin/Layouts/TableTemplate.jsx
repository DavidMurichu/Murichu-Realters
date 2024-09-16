import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FetchData } from '../../appService/Delay';
import { useLoading } from '../../appService/Loading';





const TableTemplate = ({ columns, endpoint, buttons = [], checkboxes = [], refresh=null }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const {showLoading, hideLoading}=useLoading();

  const fetch=async()=>{
    await FetchData(endpoint, setData,showLoading, hideLoading );
  }
  useEffect(() => {
   fetch();
  }, [endpoint,refresh]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 

  const getStatusColor = (isActive) => (isActive ? 'green' : 'red');

  const renderForeignKeyField = (row, foreignHolder, renderField) => {
    return row[foreignHolder] && row[foreignHolder][renderField] ? row[foreignHolder][renderField] : 'N/A';
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    const updatedData = data.map((row) => ({ ...row, selected: checked }));
    setData(updatedData);
  };

  const handleSingleSelect = (id, checked) => {
    const updatedData = data.map((row) => (row.id === id ? { ...row, selected: checked } : row));
    setData(updatedData);
  };

  const renderBooleanField = (value) => (
    <Typography variant="body1" style={{ color: getStatusColor(value === '1' || value === 1) }}>
      {value === '1' || value === 1 ? 'Yes' : 'No'}
    </Typography>
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {checkboxes.length > 0 && (
                <TableCell>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((row) =>
                columns.some(
                  (column) =>
                    row[column.field] &&
                    row[column.field].toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {checkboxes.length > 0 && (
                    <TableCell>
                      <Checkbox
                        checked={row.selected}
                        onChange={(e) => handleSingleSelect(row.id, e.target.checked)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {column.foreign ? (
                        <Typography variant="body1">
                          {renderForeignKeyField(row, column.foreign, column.foreignField)}
                        </Typography>
                      ) : column.field === 'is_active' || column.type === 'boolean' ? (
                        renderBooleanField(row[column.field])
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color={button.color || 'primary'}
                        onClick={() => button.handleFunction(row.id)}
                        sx={{ mr: 1 }}
                      >
                        {button.label}
                      </Button>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ToastContainer />
    </div>
  );
};

export default TableTemplate;
