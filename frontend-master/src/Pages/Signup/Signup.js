import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const [passwordError, setPasswordError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            setPasswordError('Les mots de passe ne correspondent pas');
            return;
        }

        const dataToSend = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorText = await response.text();
                setSubmitError(errorText);
            }
        } catch (error) {
            console.error('Error:', error);
            setSubmitError(error.toString());
        }
    };

    return (
        <div className='form-container-signup'>
            <h1>Espace parent</h1>
            <h3>Créer un compte gratuitement ✨</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder='Nom et prénom...'
                        onChange={handleChange}
                        required
                    />
                </div>
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
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <div>
                    <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        placeholder='Répéter votre mot de passe...'
                        onChange={handleChange}
                        required
                    />
                    {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                </div>
                <button type="submit">S'inscrire</button>
            </form>
            <div className='signin'>
                <p>J'ai déjà un compte?</p>
                <button>
                    <Link to="/login">Connexion</Link>
                </button>
            </div>
        </div>
    );
}

export default Signup;
