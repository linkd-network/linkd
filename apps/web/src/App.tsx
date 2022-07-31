import React, {FunctionComponent} from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import { Market } from './views/Market';
import { Create } from './views/Create/';
import { Dashboard } from './views/Dashboard';
import {Layout} from "./components/Layout";

const AppRouter = () => {
  return useRoutes([
    { path: "/", element: <Create /> },
    { path: "create/:entityType", element: <Create /> },
    { path: "market-place", element: <Market /> },
    { path: "dashboard", element: <Dashboard /> },
  ]);
};

const App: FunctionComponent = () => {
  return (
      <Router>
        <Layout>
            <AppRouter />
        </Layout>
      </Router>
  );
};

export default App