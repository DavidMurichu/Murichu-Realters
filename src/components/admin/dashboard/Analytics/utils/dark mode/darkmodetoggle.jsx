// DarkModeToggle.js
import React from 'react';
import useDarkMode from '../dark mode/darkmodehook';

const DarkModeToggle = () => {
    const { isDarkMode, setIsDarkMode } = useDarkMode();

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default DarkModeToggle;
