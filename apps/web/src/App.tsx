import React, {FunctionComponent} from "react";
import {BrowserRouter as Router, useRoutes} from "react-router-dom";
import {Create} from "./views/Create";
import {Dashboard} from "./views/Dashboard";
import {Login} from "./views/Login";
import {Layout} from "./components/Layout";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./styles/Theme";
import {RecoilRoot,} from 'recoil';

const Routes = () => {
    return useRoutes([
        {path: "/", element: <Create/>},
        {path: "create", element: <Create/>},
        {path: "dashboard", element: <Dashboard/>},
        {path: "login", element: <Login/>},
    ]);
};

const App: FunctionComponent = () => {
    return (
        <RecoilRoot>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <Layout>
                        <Routes/>
                    </Layout>
                </ThemeProvider>
            </Router>
        </RecoilRoot>
    );
};

export default App