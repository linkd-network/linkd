import React, {useState} from 'react';
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {CSSObject, styled, Theme, ThemeProvider} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {NavItemProps} from "../../interfaces/app.interfaces";
import DataArrayIcon from "@mui/icons-material/DataArray";
import StorageIcon from "@mui/icons-material/Storage";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import {TopBarPlaceholder} from "../TopBarPlaceholder";
import {theme} from "../../styles/Theme";
import {NavItem} from "../NavItem/NavItem";

interface NavigationProps {
    open: boolean;
}

const Navigation = ({open}: NavigationProps) => {

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

    return (
        <ThemeProvider theme={theme}>
            <Drawer variant="permanent" open={open}>
                <TopBarPlaceholder />
                <Divider/>
                <List sx={{padding: 0}}>
                    {routes.map(({text, path, icon}, index) => (
                        <ListItem
                            key={text}
                            disablePadding
                            sx={{display: 'block'}}
                                  component={NavItem}
                                  to={path}
                                  activeClassName={'active'}
                        >
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
                                <ListItemText
                                    primary={text}
                                    sx={{opacity: open ? 1 : 0, color: 'white'}}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </ThemeProvider>
    );
};

const NAV_PANEL_WIDTH = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: NAV_PANEL_WIDTH,
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: NAV_PANEL_WIDTH,
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
    Navigation
};