import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reg from "./Components/Reg";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/reg" element={<Reg />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
