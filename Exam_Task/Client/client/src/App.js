import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Stock from "./Components/Stock";
import Order from "./Components/Order";

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Stock />}></Route>
    <Route exact path="/order" element={<Order />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;