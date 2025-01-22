import React from "react";
import { useRoutes } from "react-router-dom";
import OrderForm from "./pages/OrderForm/index";
import OrderSummary from "./pages/OrderForm/components/OrderSummary";


function AppRoutes() {
  const routes = [
    { path: '/', element: <OrderForm /> },
    { path: '/order-summary', element: <OrderSummary /> },
  ];

  const element = useRoutes(routes);
  return element;
}

export default AppRoutes;