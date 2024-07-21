import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import backgroundImage from 'src/assets/images/users/logo.png';

export default function AuthBackground() {
    return (
        <Box
            sx={{
                position: 'absolute',
                filter: 'blur(40px)',
                zIndex: -1,
                bottom: 0,
                transform: 'inherit',
                width: '100%',
                height: '100vh', // Set the height to cover the entire viewport
                backgroundImage: `url(${backgroundImage})`, // Use the imported background image
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
}