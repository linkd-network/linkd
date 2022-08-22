import {ConnectWalletButton} from "../ConnectWalletButton";
import React, {Fragment} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {theme} from "../../styles/Theme";
import {Box, Toolbar, Typography, IconButton, AppBar } from '@mui/material';
import {TopBarPlaceholder} from "../TopBarPlaceholder";
import {currentNavLabelState} from "../../state";
import {useRecoilValue} from "recoil";

interface HeaderProps {
    handleDrawerOpen: () => void;
}

const Header = ({handleDrawerOpen}: HeaderProps) => {
    const currentNavLabel = useRecoilValue(currentNavLabelState);

    return (
        <Fragment>
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
                                / &nbsp;{currentNavLabel}
                            </Typography>
                        </Box>
                        <ConnectWalletButton/>
                    </Toolbar>
                </AppBar>
            </Box>
            <TopBarPlaceholder/>
        </Fragment>
    );
};

export {
    Header
};
