import React, { Component } from 'react';
import Navbar from './Components/inc/Navbar';
import Home from './Components/pages/Home';
import Categories from './Components/pages/Categories';
import Footer from './Components/pages/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


function App() {
    return (
        <Router>
            <div >
                <Navbar />

                <Routes>
                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/categories"
                        element={<Categories />}
                    />

                    <Route
                        path="/footer"
                        element={<Footer />}
                    />

                </Routes>
                
            </div>
        </Router>
    );
}

export default App;
