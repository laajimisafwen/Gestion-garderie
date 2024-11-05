import React, { useEffect, useState } from 'react';
import "./Evenement.css";
import NavbarAdmin from '../../../Components/NavbarAdmin/NavbarAdmin';
import NavbarResponsable from '../../../Components/NavbarResponsable/NavbarResponsable';

const Evenement = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventForm, setEventForm] = useState({
        title: '',
        time: '',
        prix: ''
    });
    const [children, setChildren] = useState([]);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/user/evenements');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const sortedEvents = data.sort((a, b) => new Date(b.time) - new Date(a.time));
            setEvents(sortedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchChildren = async () => {
            if (selectedEvent) {
                try {
                    const response = await fetch(`http://localhost:3001/api/user/enfants`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const enfants = await response.json();
                    // bech yaamel filtre lel les enfants eli deja aamlin inscrii....
                    const subscribedChildren = await Promise.all(
                        enfants.map(async (child) => {
                            const checkResponse = await fetch(`http://localhost:3001/api/user/evenements/${selectedEvent._id}/${child._id}/check`, {
                                method: 'POST',
                            });
                            const isSubscribed = await checkResponse.json();
                            return checkResponse.ok && isSubscribed ? child : null;
                        })
                    );
                    setChildren(subscribedChildren.filter(child => child !== null));
                } catch (error) {
                    console.error('Error fetching children:', error);
                }
            }
        };

        fetchChildren();
    }, [selectedEvent]);

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
        };
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEventForm({
            ...eventForm,
            [name]: value
        });
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/add-evenement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchEvents();
            setEventForm({ title: '', time: '', prix: '' });
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleEventUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/user/evenements/${selectedEvent._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventForm)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchEvents();
            setSelectedEvent(null);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDeleteEvent = async () => {
        if (!selectedEvent) return;

        try {
            const response = await fetch(`http://localhost:3001/api/user/evenements/${selectedEvent._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            fetchEvents();
            setSelectedEvent(null);
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };


    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseCard = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            {localStorage.getItem('admin') ? <NavbarAdmin /> : <NavbarResponsable />}
            <div className='evenement'>
            <h1>Evenements</h1>
                {!selectedEvent && (
                    <div className="event-add-form">
                        <div className="event-add-form">
                            <input
                                type="text"
                                name="title"
                                placeholder="Titre..."
                                onChange={handleFormChange}
                            />
                            <br /><br />
                            <label>Date et temps: </label>
                            <input
                                type="datetime-local"
                                name="time"
                                defaultValue={selectedEvent?.time ? new Date(selectedEvent.time).toISOString().split('T')[0] : ''}
                                onChange={handleFormChange}
                            />
                            <br /><br />
                            <input
                                type="number"
                                name="prix"
                                placeholder="Prix..."
                                onChange={handleFormChange}
                            />
                            <br /><br />
                            <button onClick={handleAddEvent}>Ajouter Evenement</button>
                        </div>
                    </div>
                )}
                <div className="event-list">
                    {events.map((event) => {
                        const isExpired = new Date(event.time) < new Date();
                        return (
                            <div key={event._id} className={`event-card ${isExpired ? 'expired' : ''}`} onClick={() => handleCardClick(event)}>
                                <h2>{event.title}</h2>
                                <p>Date et temps: {new Date(event.time).toLocaleString()}</p>
                                <p>Prix: {event.prix || 'Free'}</p>
                                {isExpired && <span className="expired-label">Expiré</span>}
                            </div>
                        );
                    })}

                    {selectedEvent && (
                        <div className="event-details-card">
                            <label>Titre: </label>
                            <input type='text' name='title' onChange={handleFormChange} />
                            <br /><br />
                            <label>Temps et date: </label>
                            <input
                                type="datetime-local"
                                name="time"
                                onChange={handleFormChange}
                            /> <br /><br />
                            <label>Prix: </label>
                            <input type='number' name='prix' onChange={handleFormChange} />
                            <br /><br />
                            <label>Inscriptions: </label>
                            <input type='number' name='inscription' onChange={handleFormChange} value={selectedEvent.inscriptions.length} />
                            <br /><br />
                            <label>Enfants inscrits: </label>
                            <ul>
                                {children.map((child) => (
                                    <li key={child._id}>{child.username}</li>
                                ))}
                            </ul>
                            <button className="confirm-button" onClick={handleEventUpdate}>Confirmer</button>
                            <button className="close-button" onClick={handleCloseCard}>Close</button>
                            <button className="delete-button" onClick={handleDeleteEvent}>Supprimer</button>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default Evenement;
