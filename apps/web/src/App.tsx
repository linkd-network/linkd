import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useRoutes } from "react-router-dom";

import Toolbar from './components/toolbar/Toolbar';
import ContractCreator from './components/contractCreator/ContractCreator';
import SubscribePage from './components/SubscribePage/SubscribePage';



const AppRouter = () => {
  let routes = useRoutes([
    { path: "/", element: <ContractCreator /> },
    { path: "create", element: <ContractCreator /> },
    { path: "subscribe", element: <SubscribePage /> },
    
    // ...
  ]);
  return routes;
};



const App: React.FC = () => {
  const [myVar, setMyVar] = useState();

  useEffect(() => {
    fetch('/mgmt/v1/health-check')
      .then(res => res.json())
      .then((res) => {
        setMyVar(res)
      });
  }, [])


  return (
    <div>

      <Toolbar ></Toolbar>

      <Router>
        <AppRouter />
      </Router>

    </div>


  )
}

export default App