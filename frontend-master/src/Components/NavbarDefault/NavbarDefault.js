import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarDefault.css';

const NavbarDefault = () => {

    return (
        <nav className="navbar-default">
            <Link to="/" className="logo"><h1>Happy Child</h1></Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/tarif" className="nav-link">Tarifs</Link>
                </li>
                <li className="nav-item">
                    <Link to="/Apropos" className="nav-link">A propos</Link>
                </li>
                <li className="nav-item">
                    <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
            <div className="nav-item">
                <Link to="/login" className="nav-link">Connexion</Link>
            </div>
        </nav>
    );
}

export default NavbarDefault;
