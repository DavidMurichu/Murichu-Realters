// LoginPage.js

import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { ToastContainer } from 'react-toastify';
import { showToast } from '../../../appService/Toast/Toast';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../appService/auth/AuthService';


const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const StyledCard = styled.div`
  width: 350px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const LoginPage = () => {
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = async (username, password) => {
    const { success, error } = await login(username, password);
    if (success) {
      showToast('Log in success', 'success');
      history.push('/admin'); 
    } else {
      showToast(error, 'error');
    }
  };

  return (
    <StyledContainer>
      <StyledCard>
        <StyledHeading>Login</StyledHeading>
        <LoginForm onLogin={handleLogin} />
      </StyledCard>
      <ToastContainer style={{ zIndex: 99999999999 }} />
    </StyledContainer>
  );
};

export default LoginPage;
