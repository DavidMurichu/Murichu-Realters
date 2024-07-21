// utils/dark mode/useDarkMode.js
import { useContext } from 'react';
import { DarkModeContext } from '../dark mode/index';

const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export default useDarkMode;
