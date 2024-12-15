import React from "react";
import { useRoutes } from "react-router-dom";
import FirstPage from "./pages/orderPage/FirstPage";
import LandingPage from "./pages/orderPage/LandingPage";

function AppRoutes() {
  const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/first', element: <FirstPage /> }
  ];

  const element = useRoutes(routes);
  return element;
}

export default AppRoutes;