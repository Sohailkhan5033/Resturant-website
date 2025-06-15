import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import BookTable from './components/BookTable';
import FrontPage from './components/FrontPage';
import OrderPage from "./components/OrderPage";
import About from "./components/About";
import AddDishPage from "./components/AddNewDish";
import EditDishPage from "./components/EditDish";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/add-dish" element={<AddDishPage/>} />
        <Route path="/edit-dish/:id" element={<EditDishPage />} />
      </Routes>
    </Router>
  );
}
