import React, {Fragment} from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Toolbar from './components/Toolbar/Toolbar';
import Create from './components/Create/Create';
import Subscribe from './components/Subscribe/Subscribe';
import Analytics from './components/Analytics/Analytics';
import LineChart from './components/LineChart/LineChart';
import BarChart from './components/BarChart/BarChart';
import PieChart from './components/PieChart/PieChart';

const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <Create /> },
    { path: "/dashboard", element: <PieChart /> },
    { path: "create", element: <Create /> },
    { path: "market-place", element: <Subscribe /> },
    { path: "analytics", element: <Analytics /> },
  ]);
  return routes;
};

const App: React.FC = () => {
  return (
    <Fragment>
      <Router>
        <Toolbar />
        <AppRouter />
      </Router>
    </Fragment>
  );
};

export default App