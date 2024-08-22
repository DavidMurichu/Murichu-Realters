import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Dashboard, Settings, People, BarChart, Home, AccountTree, House, HouseOutlined, Logout, Message, Info, Article, Book } from '@mui/icons-material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory for navigation
import { useAuth } from '../../appService/auth/AuthService';

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
  const { logout } = useAuth(); // Use the logout function from AuthService
  const history = useHistory(); // Use history for navigation

  const handleLogout = () => {
    logout(); // Call the logout function
  
  };

  const navItems = [
    { text: 'Home', icon: <Home style={{ color: 'white' }} />, path: '/' },
    { text: 'Dashboard', icon: <Dashboard style={{ color: 'white' }} />, path: '/admin' },
    { text: 'Property Management', icon: <BarChart style={{ color: 'white' }} />, path: '/admin/manage-property' },
    { text: 'My Agents', icon: <People style={{ color: 'white' }} />, path: '/admin/agents' },
    { text: 'User Response', icon: <Message style={{ color: 'white' }} />, path: '/admin/user-response' },
    { text: 'Blogs', icon: <Book style={{ color: 'white' }} />, path: '/admin/blogs' },
    { text: 'Log out', icon: <Logout style={{ color: 'white' }} />, type: 'button' },
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
          {navItems.map((item) => 
            item.type === 'button' ? (
              <ListItemStyled button onClick={handleLogout} key={item.text}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemStyled>
            ) : (
              <Link to={item.path} key={item.text} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemStyled>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemStyled>
              </Link>
            )
          )}
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
