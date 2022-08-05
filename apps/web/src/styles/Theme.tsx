import * as React from 'react';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            contrastText: '#f7f7f7',
            light: '#202020',
            dark: '#101010',
        },
        secondary: {
            main: '#2563eb',
        },
    },
    typography: {
        fontFamily: 'Baloo 2',
    },
});

export {
    theme
}