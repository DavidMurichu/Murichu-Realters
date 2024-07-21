import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Settings, People, BarChart, Home, AccountTree, House, HouseOutlined } from '@mui/icons-material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

// Animation for reactivity
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const MainBox = styled(Box)({
  display: 'flex',
  animation: `${fadeIn} 1s ease-in-out`
});

const AppBarStyled = styled(AppBar)({
  zIndex: (theme) => theme.zIndex.drawer + 1,
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth}px`,
  backgroundColor: '#27ae60'
});

const DrawerStyled = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#1c1c1c',
    color: 'white'
  }
});

const ToolbarStyled = styled(Toolbar)({
  backgroundColor: '#27ae60',
  color: 'white'
});

const ListItemStyled = styled(ListItem)({
  '&:hover': {
    backgroundColor: '#27ae60',
    color: 'white'
  }
});

const MainContent = styled(Box)({
  flexGrow: 1,
  backgroundColor: '#f5f5f5',
  padding: '24px',
  animation: `${fadeIn} 1s ease-in-out`
});

const AdminDashboard = ({ children }) => {
  const navItems = [
    { text: 'Dashboard', icon: <Dashboard style={{ color: 'white' }} />, path: '/admin' },
    { text: 'Property Management', icon: <BarChart style={{ color: 'white' }} />, path: '/admin/manage-property' },
    { text: 'My Agents', icon: <People style={{ color: 'white' }} />, path: '/admin/agents' },
  ];

  return (
    <MainBox>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <ToolbarStyled>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </ToolbarStyled>
      </AppBarStyled>
      <DrawerStyled variant="permanent" anchor="left">
        <Toolbar />
        <Divider />
        <List>
          {navItems.map((item) => (
            <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemStyled >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemStyled>
            </Link>
          ))}
        </List>
      </DrawerStyled>
      <MainContent component="main">
        <Toolbar />
        {children}
      </MainContent>
    </MainBox>
  );
};

export default AdminDashboard;
