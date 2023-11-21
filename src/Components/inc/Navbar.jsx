import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Assets/LogoPng.png';

function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <img src={Logo} className="logo" style={{ width: '10%', height: '70px' }} alt="..." />                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/home" className="nav-link" activeClassName="active">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/categories" className="nav-link" activeClassName="active">
                                    Categories
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/footer" className="nav-link" activeClassName="active">
                                    Footer
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
