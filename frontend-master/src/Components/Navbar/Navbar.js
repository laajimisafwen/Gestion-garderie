import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('user') || localStorage.getItem('admin');

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('responsable');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <Link to="/" className="logo"><h1>Happy Child</h1></Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/enfant" className="nav-link">Enfants</Link>
                </li>
                <li className="nav-item">
                    <Link to="/evenements" className="nav-link">Evenements</Link>
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
            {isLoggedIn ? (
                <div className="nav-item">
                    <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', font: 'inherit', cursor: 'pointer', outline: 'inherit' }}>Déconnexion</button>
                </div>
            ) : (
                <div className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
