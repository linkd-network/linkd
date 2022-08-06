import React, {Fragment, ReactNode} from 'react';
import {Header} from "./Header";
import {Navigation} from "./Navigation";
import {ClickAwayListener} from "@mui/material";

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

const Layout = ({children}: LayoutProps) => {

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <ClickAwayListener onClickAway={handleDrawerClose}>
                <div>
                    <Header
                        open={open}
                        handleDrawerClose={handleDrawerClose}
                        handleDrawerOpen={handleDrawerOpen}
                    />
                    <Navigation
                        open={open}
                        handleDrawerClose={handleDrawerClose}
                    />
                </div>
            </ClickAwayListener>
            <main className="h-100vh p-14 bg-gray-900">
                <div className="container w-full mx-auto px-6">
                    {children}
                </div>
            </main>
        </Fragment>
    );
};

export {
    Layout
};