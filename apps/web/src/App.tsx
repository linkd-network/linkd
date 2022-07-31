import React, { Fragment } from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Toolbar from './components/Toolbar/Toolbar';
import Create from './components/Create/Create';
import Subscribe from './components/Subscribe/Subscribe';
import { Dashboard } from './views/Dashboard';
import DRTSubscribePage from './components/DRTSubscirbePage/DRTSubscribePage';

const AppRouter = () => {
  return useRoutes([
    { path: "/", element: <Create /> },
    { path: "create", element: <Create /> },
    { path: "market-place", element: <Subscribe /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "subscribe/:entityType", element: <DRTSubscribePage /> },
  ]);
};

const App: React.FC = () => {
  return (
    <div className='text-white'>
      <Router>
        <Toolbar />
        <AppRouter />
      </Router>
    </div>
  );
};

export default App