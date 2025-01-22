import "./App.css";
import { useState } from "react";
import Routes from "./route";
import { BrowserRouter } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';
import { Analytics } from "@vercel/analytics/react";
import { OrderFormProvider } from "./pages/OrderForm/contexts/OrderFormContext";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <OrderFormProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </OrderFormProvider>
      <Analytics />
    </>
  );
}

export default App;
