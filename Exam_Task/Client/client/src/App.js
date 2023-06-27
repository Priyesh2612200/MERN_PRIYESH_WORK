import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stock from "./Components/Stock";
import Order from "./Components/Order";
import Sidebar from "./Components/Sidebar";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar >
          <Routes>
            <Route exact path="/" element={<Stock />}></Route>
            <Route exact path="/order" element={<Order />}></Route>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;