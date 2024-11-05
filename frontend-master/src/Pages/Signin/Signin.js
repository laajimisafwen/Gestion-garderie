import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            login: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    localStorage.setItem('user', JSON.stringify(data));
                    navigate('/');
                } else {
                    const textData = await response.text();
                    throw new Error('Error: ' + textData);
                }
            } else {
                throw new Error('Login failed: ' + response.statusText);
            }

        } catch (error) {
            console.error('Error:', error);
            setLoginError(error.toString());
        }
    };

    return (
        <div className='form-container-signin'>
            <h1>Espace parent</h1>
            <h3>🎉 Bienvenu dans notre espace</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder='Email...'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder='Mot de passe...'
                        onChange={handleChange}
                        required
                    />
                </div>
                {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                <button type="submit">Connexion</button>
            </form>
            <div className='signup'>
                <p>Vous n'avez pas de compte?</p>
                <button>
                    <Link to="/signup">S'inscrire</Link>
                </button>
            </div>
            <div className='admin'>
                <p>Vous ètes</p>
                <button>
                    <Link to="/admin-login">Admin </Link>
                </button>
                <p>Ou</p>
                <button>
                    <Link to="/responsable-login"> Responsable</Link>
                </button>
            </div>
        </div>
    );
}

export default Signin;
