import React, {Fragment} from 'react';
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import Toolbar from './components/toolbar/Toolbar';
import ContractCreator from './components/contractCreator/ContractCreator';
import SubscribePage from './components/SubscribePage/SubscribePage';
import Monitor from './components/Monitor/Monitor';

const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <ContractCreator /> },
    { path: "create", element: <ContractCreator /> },
    { path: "subscribe", element: <SubscribePage /> },
    { path: "monitor", element: <Monitor /> },
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