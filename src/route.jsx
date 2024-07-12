import React from "react";
import { useRoutes } from "react-router-dom";
import LandingPage from "./pages/orderPage/LandingPage";
import FirstPage from "./pages/orderPage/FirstPage"; // pastikan nama file dan path benar

function AppRoutes() {
  const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/first', element: <FirstPage /> }
  ];

  const element = useRoutes(routes);
  return element;
}

export default AppRoutes;