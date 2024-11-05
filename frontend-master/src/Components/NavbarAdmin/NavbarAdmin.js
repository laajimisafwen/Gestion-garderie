import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarAdmin.css';

const NavbarAdmin = () => {

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('user') || localStorage.getItem('admin');

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('responsable');
        navigate('/login');
    }

    return (
        <nav className="navbar-admin">
            <Link to="/admin" className="logo"><h1>Happy Child</h1></Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/admin" className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                    <Link to="/enfant-admin" className="nav-link">Enfants</Link>
                </li>
                <li className="nav-item">
                    <Link to="/evenements-admin" className="nav-link">Evenements</Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin-parent" className="nav-link">Parents</Link>
                </li>
                <li className="nav-item">
                    <Link to="/responsables" className="nav-link">Responsables</Link>
                </li>
                <li className="nav-item">
                    <Link to="/payment" className="nav-link">Paiement</Link>
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

export default NavbarAdmin;
