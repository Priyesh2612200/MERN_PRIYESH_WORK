import './App.css';
import Navbar from './Components/navbar';
import AddProduct from './Components/product';
import Category from './Components/category';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
      <Route exact path="/" element={<Navbar />}></Route>
      <Route exact path="/product" element={<AddProduct />}></Route>
      <Route exact path="/category" element={<Category />}></Route>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
