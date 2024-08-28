import React from "react";
import { useRoutes } from "react-router-dom";
import FutsalForm from "./pages/orderPage/FutsalForm";
import FirstPage from "./pages/orderPage/FirstPage"; // pastikan nama file dan path benar

function AppRoutes() {
  const routes = [
    { path: '/', element: <FutsalForm /> },
    { path: '/first', element: <FirstPage /> }
  ];

  const element = useRoutes(routes);
  return element;
}

export default AppRoutes;