import Wallet from "../../Wallet/Wallet";
import React, {useState} from "react";
import {NavItemProps} from "../../../interfaces/app.interfaces";
import {NavItem} from "../../NavItem/NavItem";

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ClickAwayListener, ThemeProvider} from "@mui/material";
import {theme} from "../../../styles/Theme";
import Divider from "@mui/material/Divider";
import {CSSObject, styled, Theme} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DataArrayIcon from "@mui/icons-material/DataArray";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import StorageIcon from '@mui/icons-material/Storage';
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";

const Header: React.FC = () => {

    const [routes, setRoutes] = useState<NavItemProps[]>([
        {
            text: "Create",
            path: "/create",
            icon: <DataArrayIcon sx={{color: 'white'}}/>,
        },
        {
            text: "Market Place",
            path: "/market",
            icon: <StorageIcon sx={{color: 'white'}}/>,
        },
        {
            text: "Dashboard",
            path: "/dashboard",
            icon: <DataUsageIcon sx={{color: 'white'}}/>,
        },
    ]);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <ClickAwayListener onClickAway={handleDrawerClose}>
                <Box sx={{display: 'flex'}}>
                        <CssBaseline/>
                        <AppBar position="fixed" sx={{zIndex: theme.zIndex.drawer + 1}}>
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
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader/>
                            <Divider/>
                            <List>
                                {routes.map(({text, path, icon}, index) => (
                                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} sx={{opacity: open ? 1 : 0, color: 'white'}}/>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                    </Box>
            </ClickAwayListener>
            <DrawerHeader/>
        </ThemeProvider>
    );
};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiPaper-root.MuiDrawer-paper': {
            backgroundColor: theme.palette.primary.dark,
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export {
    Header
};
