import * as React from 'react';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
            contrastText: '#EFEFEF',
            light: '#202020',
            dark: '#101010',
        },
        secondary: {
            main: '#2563eb',
        },
        background: {
            default: '#101010',
            paper: '#202020',
        },
        text: {
            primary: '#EFEFEF',
            secondary: '#9F9F9F',
            disabled: '#606060',
        },
        grey: {
            50: '#EFEFEF',
            100: '#DFDFDF',
            200: '#BFBFBF',
            300: '#9F9F9F',
            400: '#808080',
            500: '#606060',
            600: '#404040',
            700: '#202020',
            800: '#101010',
            900: '#000000',
        }
    },
    typography: {
        fontFamily: "\'Baloo 2\'",
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                }),
                notchedOutline: ({ theme }) => ({
                    borderColor: theme.palette.primary.light,
                    borderWidth: '2px',
                }),
                root: ({ theme }) => ({
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${theme.palette.secondary.main}`,
                    }
                }),
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                }),
            },
        },
    },
});

export {
    theme
}