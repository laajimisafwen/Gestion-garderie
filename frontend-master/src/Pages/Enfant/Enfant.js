import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import "./Enfant.css";

const Enfant = () => {
    const [enfants, setEnfants] = useState([]);
    const [selectedEnfant, setSelectedEnfant] = useState(null);
    const [enfantForm, setEnfantForm] = useState({
        username: '',
        subscription: false,
        naissance: '',
        health: false,
        medecin: ''
    });
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    useEffect(() => {
        fetchEnfants();
    }, []);

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
        };
    }, []);

    const fetchEnfants = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/enfants`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setEnfants(data);
        } catch (error) {
            console.error('Error fetching enfants:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEnfantForm({
            ...enfantForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddEnfant = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/${userId}/add-enfant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enfantForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchEnfants();
            setEnfantForm({ username: '', subscription: false, naissance: '', health: false, medecin: '' });
        } catch (error) {
            console.error('Error adding enfant:', error);
        }
    };

    const handleDeleteEnfant = async (enfantId) => {
        if (window.confirm('Are you sure you want to delete this child?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/user/enfants/${enfantId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                fetchEnfants();
            } catch (error) {
                console.error('Error deleting enfant:', error);
            }
        }
    };

    const handleUpdateEnfant = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/enfants/${selectedEnfant}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enfantForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchEnfants();
            setSelectedEnfant(null);
        } catch (error) {
            console.error('Error updating enfant:', error);
        }
    };
    
    const handleEditClick = (enfant) => {
        setSelectedEnfant(enfant._id);
        setEnfantForm({
            username: enfant.username,
            subscription: enfant.subscription,
            naissance: enfant.naissance,
            health: enfant.health,
            medecin: enfant.medecin
        });
    };

    return (
        <>
            <Navbar />
            <div className="enfants-container">
                <div className="enfants-list">
                    {enfants.map((enfant) => (
                        <React.Fragment key={enfant._id}>
                            <div className="enfant-card">
                                <div className="enfant-info">
                                    <p>Nom Et Prénom: {enfant.username}</p>
                                    <p>Abonnement: {enfant.subscription ? 'Yes' : 'No'}</p>
                                    <p>Date De Naissance: {new Date(enfant.naissance).toLocaleDateString()}</p>
                                    <p>Santé: {enfant.health ? 'Bien' : 'A des problèmes'}</p>
                                    <p>Medecin: {enfant.medecin || 'None'}</p>
                                    <p>Groupe: {enfant.groupe || 'None'}</p>
                                </div>
                                <div className="enfant-actions">
                                    <button onClick={() => handleEditClick(enfant)}>Modifier</button>
                                    <button onClick={() => handleDeleteEnfant(enfant._id)}>Supprimer</button>
                                </div>
                            </div>
                            {selectedEnfant === enfant._id && (
                                <div className="enfant-edit-form">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Nom et prénom de l'enfant"
                                        value={enfantForm.username}
                                        onChange={handleFormChange}
                                    />
                                    <input
                                        type="checkbox"
                                        name="subscription"
                                        checked={enfantForm.subscription}
                                        onChange={handleFormChange}
                                    /> Abonnement
                                    <br /><br />
                                    <label>Date De Naissance</label>
                                    <input
                                        type="date"
                                        name="naissance"
                                        value={enfantForm.naissance.slice(0, 10)}
                                        onChange={handleFormChange}
                                    />
                                    <input
                                        type="checkbox"
                                        name="health"
                                        checked={enfantForm.health}
                                        onChange={handleFormChange}
                                    /> Santé
                                    <input
                                        type="text"
                                        name="medecin"
                                        placeholder="Nom du medecin..."
                                        value={enfantForm.medecin}
                                        onChange={handleFormChange}
                                    />
                                    <button onClick={() => handleUpdateEnfant(enfant._id)}>Modier l'enfant</button>
                                    <button onClick={() => setSelectedEnfant(null)}>Annuler</button>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {!selectedEnfant && (
                    <div className="enfant-add-form">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nom et prénom de l'enfant"
                            value={enfantForm.username}
                            onChange={handleFormChange}
                        />
                        <input
                            type="checkbox"
                            name="subscription"
                            checked={enfantForm.subscription}
                            onChange={handleFormChange}
                        /> Abonnement
                        <br /><br />
                        <label>Date De Naissance</label>
                        <input
                            type="date"
                            name="naissance"
                            value={enfantForm.naissance}
                            onChange={handleFormChange}
                        />
                        <input
                            type="checkbox"
                            name="health"
                            checked={enfantForm.health}
                            onChange={handleFormChange}
                        /> Santé
                        <input
                            type="text"
                            name="medecin"
                            placeholder="Nom du medecin.."
                            value={enfantForm.medecin}
                            onChange={handleFormChange}
                        />
                        <button onClick={handleAddEnfant}>Ajouter enfant</button>
                    </div>
                )}
            </div>
        </>

    );

}

export default Enfant;
