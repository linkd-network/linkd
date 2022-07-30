import React, { Fragment } from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Toolbar from './components/Toolbar/Toolbar';
import Create from './components/Create/Create';
import Subscribe from './components/Subscribe/Subscribe';
import Analytics from './components/Analytics/Analytics';
import DRTSubscribePage from './components/DRTSubscirbePage/DRTSubscribePage';

const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <Create /> },
    { path: "create", element: <Create /> },
    { path: "market-place", element: <Subscribe /> },
    { path: "analytics", element: <Analytics /> },
    { path: "subscribe/:entityType", element: <DRTSubscribePage /> },
  ]);
  return routes;
};

const App: React.FC = () => {
  return (
    <div className='text-white'>

      <Fragment >
        <Router>
          <Toolbar />
          <AppRouter />
        </Router>
      </Fragment>
    </div>
  );
};

export default App