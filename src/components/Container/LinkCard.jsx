import React, { useContext } from 'react';
import { Card, CardContent, Avatar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';
import { TenureContext } from '../appService/TenureProvider'; // Adjust the path as needed
import { toast } from 'react-toastify';

const HeadingWrapper = styled(Box)`
  text-align: center;
  display: block;
  margin: 0;
`;

const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled(Typography)`
  font-size: 1rem;
  margin: 0;
  max-width: 50ch;
`;

const RoundedButton = styled(Button)`
  border-radius: 30px;
  padding: 2% 2%;
  color: #27ae60;
  font-size: 1rem;
  font-weight: 400;
  border: 2px solid #27ae601f;
  background: #fff;
  margin: 2rem;
`;

const Heading = ({ title, subtitle }) => (
  <HeadingWrapper>
    <Title variant="h1">{title}</Title>
    <Subtitle variant="body1">{subtitle}</Subtitle>
  </HeadingWrapper>
);

const AvatarWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin: 1rem;

  &:hover {
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ResponsiveAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
  }
`;

const LinkCard = ({ avatarSrc, title, subtitle, buttontext, tenure }) => {
  const history = useHistory();
  // const [activeTenure, setActiveTenure] = useContext(TenureContext);
  const { propertyTenure, setPropertyTenure } = useContext(TenureContext);


  const handleButtonClick = () => {

    setPropertyTenure(tenure);
    toast.success(propertyTenure);
    history.push('/listings');
  };

  return (
    <StyledCard>
      <AvatarWrapper>
        <ResponsiveAvatar src={avatarSrc} alt="Avatar Image" />
      </AvatarWrapper>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={3}>
          <Heading title={title} subtitle={subtitle} />
          <RoundedButton variant="outlined" onClick={handleButtonClick}>
            {buttontext}
          </RoundedButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default LinkCard;
