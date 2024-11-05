import React from 'react';
import './Apropos.css';
import Navbar from '../../Components/Navbar/Navbar';
import NavbarDefault from '../../Components/NavbarDefault/NavbarDefault';

const Apropos = () => {
    const userLoggedIn = localStorage.getItem('user');

    return (
        <>
            {userLoggedIn ? <Navbar /> : <NavbarDefault />}
            <div className="apropos-container">
                <div className="text-zone">
                    <h1>À Propos de notre école</h1>
                    <p>
                        Bienvenue à notre garderie, un endroit chaleureux et accueillant où chaque enfant est encouragé à explorer, apprendre et grandir. Notre équipe dévouée de professionnels de la petite enfance s'engage à offrir un environnement sûr et stimulant pour favoriser le développement global de chaque enfant.
                    </p>
                    <p>
                        Chez nous, nous croyons en l'importance de l'apprentissage par le jeu et nous offrons un programme éducatif enrichissant qui encourage la créativité, la curiosité et la confiance en soi. Nous mettons l'accent sur le développement social, émotionnel, physique et cognitif de chaque enfant, en les aidant à acquérir les compétences essentielles pour réussir à l'école et dans la vie.
                    </p>
                    <p>
                        Notre garderie est plus qu'un simple lieu de garde d'enfants. C'est une communauté où les familles se sentent soutenues et les enfants se sentent aimés et valorisés. Nous sommes fiers de créer un environnement inclusif où la diversité est célébrée et où chacun se sent accepté et respecté.
                    </p>
                    <p>
                        Nous sommes impatients de vous accueillir à notre garderie et de partager cette aventure passionnante avec vous et votre enfant. Ensemble, nous pouvons créer des souvenirs précieux et jeter les bases d'un avenir brillant pour nos tout-petits.
                    </p>


                </div>
            </div>
        </>
    );
}

export default Apropos;