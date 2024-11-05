import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../../Components/NavbarAdmin/NavbarAdmin';
import "./Enfant.css";
import NavbarResponsable from '../../../Components/NavbarResponsable/NavbarResponsable';

const EnfantAdmin = () => {
    const [enfants, setEnfants] = useState([]);
    const [listType, setListType] = useState('all');
    const [selectedEnfant, setSelectedEnfant] = useState(null);
    const [enfantForm, setEnfantForm] = useState({
        username: '',
        subscription: false,
        naissance: '',
        health: false,
        medecin: ''
    });

    const fetchEnfantsList = async () => {
        let url = 'http://localhost:3001/api/user/enfants';
        if (listType === 'abonne') {
            url += '/abonne';
        } else if (listType === 'non-abonne') {
            url += '/non-abonne';
        }

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            setEnfants(data);
        } catch (error) {
            console.error('Error fetching enfants:', error);
        }
    };

    useEffect(() => {
        fetchEnfantsList();
    }, [listType]);

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
        };
    }, []);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEnfantForm({
            ...enfantForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleDeleteEnfant = async (enfantId) => {
        if (window.confirm('Are you sure you want to delete this child?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/user/enfants/${enfantId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                fetchEnfantsList();
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
            fetchEnfantsList();
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
            {localStorage.getItem('admin') ? <NavbarAdmin /> : <NavbarResponsable />}
            <div className="enfants-container">
                <div className='enfant-actions'>
                    <button onClick={() => setListType('all')}>Tous</button>
                    <button onClick={() => setListType('abonne')}>Abonnée</button>
                    <button onClick={() => setListType('non-abonne')}>Non Abonnée</button>
                </div>
                <br /><br />
                <div className="enfants-list">
                    {enfants.map((enfant) => (
                        <React.Fragment key={enfant._id}>
                            <div className="enfant-card">
                                <div className="enfant-info">
                                    <p>Nom Et Prénom: {enfant.username}</p>
                                    <p>Abonnement: {enfant.subscription ? 'Oui' : 'Non'}</p>
                                    <p>Date De Naissance: {new Date(enfant.naissance).toLocaleDateString()}</p>
                                    <p>Santé: {enfant.health ? 'Bien' : 'A des problèmes'}</p>
                                    <p>Medecin: {enfant.medecin || 'None'}</p>
                                    <p>Parent: {enfant.parent.username || 'None'}</p>
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
            </div>
        </>

    );

}

export default EnfantAdmin;
