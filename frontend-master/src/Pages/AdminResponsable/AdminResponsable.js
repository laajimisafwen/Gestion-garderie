import React, { useEffect, useState } from 'react';
import NavbarAdmin from "../../Components/NavbarAdmin/NavbarAdmin";
import "./AdminResponsable.css";

const AdminResponsable = () => {
    const [responsables, setResponsable] = useState([]);
    const [selectedResponsable, setSelectedResponsable] = useState(null);
    const [responsableForm, setResponsableForm] = useState({
        _id: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        fetchResponsables();
    }, []);

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
        };
    }, []);

    const fetchResponsables = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/responsables`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setResponsable(data);
        } catch (error) {
            console.error('Error fetching responsables:', error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setResponsableForm({
            ...responsableForm,
            [name]: value
        });
    };

    const handleAddResponsable = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/add-responsable`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responsableForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchResponsables();
            setResponsableForm({ _id: '', username: '', email: '', password: '' });
        } catch (error) {
            console.error('Error adding responsable:', error);
        }
    };

    const handleDeleteResponsable = async (responsableId) => {
        if (window.confirm('Are you sure?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/user/responsables/${responsableId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Network response was not ok');
                fetchResponsables();
            } catch (error) {
                console.error('Error deleting responsable:', error);
            }
        }
    };

    const handleUpdateResponsable = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/responsables/${selectedResponsable}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responsableForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchResponsables();
            setSelectedResponsable(null);
        } catch (error) {
            console.error('Error updating responsable:', error);
        }
    };

    const handleEditClick = (responsable) => {
        setSelectedResponsable(responsable._id);
        setResponsableForm({
            username: responsable.username,
            email: responsable.email,
            password: responsable.password
        });
    };

    return (
        <>
            <NavbarAdmin />
            <div className="responsables-container">
                <div className="responsables-list">
                    {responsables.map((responsable) => (
                        <React.Fragment key={responsable._id}>
                            <div className="responsable-card">
                                <div className="responsable-info">
                                    <p>ID: {responsable._id}</p>
                                    <p>Nom Et Prénom: {responsable.username}</p>
                                    <p>Email: {responsable.email}</p>
                                    <p>Groupe: {responsable.groupe}</p>
                                </div>
                                <div className="responsable-actions">
                                    <button onClick={() => handleEditClick(responsable)}>Modifier</button>
                                    <button onClick={() => handleDeleteResponsable(responsable._id)}>Supprimer</button>
                                </div>
                            </div>
                            {selectedResponsable === responsable._id && (
                                <div className="responsable-edit-form">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Nom et prénom..."
                                        value={responsableForm.username}
                                        onChange={handleFormChange}
                                    />
                                    <br /><br />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email..."
                                        value={responsableForm.email}
                                        onChange={handleFormChange}
                                    />
                                    <button onClick={() => handleUpdateResponsable(responsable._id)}>Modier</button>
                                    <button onClick={() => setSelectedResponsable(null)}>Annuler</button>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                {!selectedResponsable && (
                    <div className="responsable-add-form">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nom et prénom..."
                            onChange={handleFormChange}
                        />
                        <br /><br />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email..."
                            onChange={handleFormChange}
                        />
                        <br /><br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password..."
                            onChange={handleFormChange}
                        />
                        <button onClick={handleAddResponsable}>Ajouter responsable</button>
                    </div>
                )}
            </div>
        </>

    );

}

export default AdminResponsable;
