import React, { useState } from 'react';
import './Tarif.css';
import Navbar from '../../Components/Navbar/Navbar';
import NavbarDefault from '../../Components/NavbarDefault/NavbarDefault';

function Tarif() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        cardExp: '',
        cardCVC: ''
    });

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedPlan) {
            alert('Veuillez sélectionner un plan d’abonnement avant de payer.');
            return;
        } else if (!(JSON.parse(localStorage.getItem('user')))) {
            alert("Vous devez être inscrit pour effectuer le paiement de l'abonnement");
            return;
        }
        alert(`Merci pour votre abonnement ${selectedPlan}. Le paiement a été effectué avec succès.`);
    };

    return (
        <>
            {JSON.parse(localStorage.getItem('user')) ? <Navbar /> : <NavbarDefault />}
            <div className="tarif">
                <h1 className="tarif-title">Nos Tarifs</h1>
                <div className="subscription-options">
                    {['3 mois', 'un an', 'deux ans'].map((plan, index) => (
                        <div className={`option ${selectedPlan === plan ? 'selected' : ''}`}
                            key={index}
                            onClick={() => handlePlanSelect(plan)}>
                            <h2>Abonnement de {plan}</h2>
                            <p className="price">{plan === '3 mois' ? '300 DT' : plan === 'un an' ? '1100 DT' : '2000 DT'}</p>
                            <p className="benefit">{plan === '3 mois' ? '5% de réduction sur les activités supplémentaires' : plan === 'un an' ? '10% de réduction + accès prioritaire aux événements' : '15% de réduction totale + cadeau de bienvenue'}</p>
                            <button onClick={() => handlePlanSelect(plan)}>S'abonner</button>
                        </div>
                    ))}
                </div>
                {selectedPlan && (
                    <div className="payment-form">
                        <h2>Informations de paiement</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="cardName" placeholder="Nom sur la carte" value={cardInfo.cardName} onChange={handleInputChange} />
                            <input type="text" name="cardNumber" placeholder="Numéro de la carte" value={cardInfo.cardNumber} onChange={handleInputChange} />
                            <input type="text" name="cardExp" placeholder="Date d'expiration MM/AA" value={cardInfo.cardExp} onChange={handleInputChange} />
                            <input type="text" name="cardCVC" placeholder="CVC" value={cardInfo.cardCVC} onChange={handleInputChange} />
                            <br />
                            <button type="submit">Payer</button>
                            {!(JSON.parse(localStorage.getItem('user'))) && <p>Vous devez être inscrit pour effectuer le paiement de l'abonnement</p>}
                        </form>
                    </div>
                )}
            </div>
        </>

    );
}

export default Tarif;
