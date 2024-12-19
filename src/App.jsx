import "./App.css";
import { useState } from "react";
import Routes from "./route";
import { BrowserRouter } from "react-router-dom";
import 'rsuite/dist/rsuite.min.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default App;
