import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './React/login';
import Register from './React/Register';
import Home from './React/Home';
import Products from "./React/Products";
import Admin from "./React/Admin";
import Cart from "./React/Cart";
import Navbar from "./React/Navbar";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('customerToken');
        localStorage.removeItem('role');
    };

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
                <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default App;
