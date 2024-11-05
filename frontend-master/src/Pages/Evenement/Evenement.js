import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import "./Evenement.css";
import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin';

const Evenement = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');

    useEffect(() => {
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

        fetchEvents();
    }, []);

    useEffect(() => {
        const fetchChildren = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user._id && selectedEvent) {
                try {
                    const response = await fetch(`http://localhost:3001/api/user/${user._id}/enfants`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const enfants = await response.json();
                    // bech yaamel filtre lel les enfants eli deja aamlin inscrii....
                    const unsubscribedChildren = await Promise.all(
                        enfants.map(async (child) => {
                            const checkResponse = await fetch(`http://localhost:3001/api/user/evenements/${selectedEvent._id}/${child._id}/check`, {
                                method: 'POST',
                            });
                            const isSubscribed = await checkResponse.json();
                            return checkResponse.ok && !isSubscribed ? child : null;
                        })
                    );
                    setChildren(unsubscribedChildren.filter(child => child !== null));
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

    const handleInscription = async () => {
        if (selectedEvent && selectedChild) {
            try {
                // bech ylawej aala l id mtaa lenfant par rapport lusername
                const child = children.find((c) => c.username === selectedChild);
                if (!child) throw new Error('Child not found');

                const response = await fetch(`http://localhost:3001/api/user/evenements/${selectedEvent._id}/${child._id}/inscriptions`, {
                    method: 'POST',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // idha ken linscrii saret fasakh lenfant mlista
                const updatedChildren = children.filter((c) => c.username !== selectedChild);
                setChildren(updatedChildren);
                setSelectedChild(''); // bech yaamel reset lelista 
                alert('Congratulations! Inscription completed successfully.');
            } catch (error) {
                console.error('Error during inscription:', error);
                alert('There was an error processing the inscription.');
            }
        } else {
            alert('Please select a child before confirming.');
        }
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);
        setSelectedChild('');
    };

    const handleCloseCard = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            {localStorage.getItem('user') ? <Navbar /> : <NavbarAdmin />}
            <div className="event-list">
                {events.map((event) => {
                    const isExpired = new Date(event.time) < new Date();
                    return (
                        <div key={event._id} className={`event-card ${isExpired ? 'expired' : ''}`} onClick={() => !isExpired && handleCardClick(event)}>
                            <h2>{event.title}</h2>
                            <p>Date and Time: {new Date(event.time).toLocaleString()}</p>
                            <p>Price: {event.prix || 'Free'}</p>
                            {isExpired && <span className="expired-label">Expiré</span>}
                        </div>
                    );
                })}

                {selectedEvent && (
                    <div className="event-details-card">
                        <h3>{selectedEvent.title}</h3>
                        <p><strong>Date and Time:</strong> {new Date(selectedEvent.time).toLocaleString()}</p>
                        <p><strong>Price:</strong> {selectedEvent.prix || 'Free'}</p>
                        <p><strong>Inscriptions:</strong> {selectedEvent.inscriptions.length}</p>
                        <select
                            className="inscription-dropdown"
                            value={selectedChild}
                            onChange={(e) => setSelectedChild(e.target.value)}
                        >
                            <option value="">Select a child</option>
                            {children.map((child) => (
                                <option key={child._id} value={child.username}>{child.username}</option>
                            ))}
                        </select>
                        <button className="confirm-button" onClick={handleInscription}>Confirmer</button>
                        <button className="close-button" onClick={handleCloseCard}>Close</button>
                    </div>
                )}
            </div>
        </>

    );
};

export default Evenement;
