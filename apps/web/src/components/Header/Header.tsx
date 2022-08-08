import Wallet from "../Wallet/Wallet";
import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../../styles/Theme";
import AppBar from "@mui/material/AppBar/AppBar";
import {TopBarPlaceholder} from "../TopBarPlaceholder";

interface HeaderProps {
    handleDrawerOpen: () => void;
}

const Header = ({handleDrawerOpen}: HeaderProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <AppBar component="div" position="fixed" sx={{zIndex: theme.zIndex.drawer + 1}}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={{
                            display: 'flex',
                            flexGrow: 1,
                        }}>
                            <Typography variant="h6" component="h1" fontWeight="700">
                                Census
                            </Typography>
                            &nbsp;&nbsp;&nbsp;
                            <Typography variant="h6" component="h2" fontWeight="300">
                                / &nbsp;Create
                            </Typography>
                        </Box>
                        <Wallet/>
                    </Toolbar>
                </AppBar>
            </Box>
            <TopBarPlaceholder/>
        </ThemeProvider>
    );
};

export {
    Header
};
