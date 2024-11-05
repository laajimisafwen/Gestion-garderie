import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import NavbarDefault from '../../Components/NavbarDefault/NavbarDefault';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
    };

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
            document.body.style.backgroundColor = "#6a3093";
        };
    }, []);

    return (
        <>
            {JSON.parse(localStorage.getItem('user')) ? <Navbar /> : <NavbarDefault />}
            <div className="home">
                <section className="banner">
                    <Slider {...settings}>
                        <div className="slide-item">
                            <img src={banner1} alt="Nursery Interior" />
                            <div className="banner-text">
                                <h1>Explorer l'univers de l'apprentissage</h1>
                            </div>
                        </div>
                        <div className="slide-item">
                            <img src={banner2} alt="Children Playing" />
                            <div className="banner-text">
                                <h1>Épanouissement et jeu</h1>
                            </div>
                        </div>
                        <div className="slide-item">
                            <img src={banner3} alt="Learning Activities" />
                            <div className="banner-text">
                                <h1>Cultiver la créativité</h1>
                            </div>
                        </div>
                    </Slider>
                </section>
                <section className="introduction">
                    <h2>Bienvenue à Happy Child</h2>
                    <p>Une crèche où chaque enfant trouve sa place, apprend et grandit en s'amusant.</p>
                </section>
                <section className="mission">
                    <h2>Notre Mission</h2>
                    <p>Fournir un environnement éducatif stimulant qui assure le développement holistique de chaque enfant avec amour et soin.</p>
                </section>
                <section className="features">
                    <h2>Caractéristiques Uniques</h2>
                    <ul>
                        <li>Programmes bilingues</li>
                        <li>Approche basée sur le jeu</li>
                        <li>Suivi de développement personnalisé</li>
                    </ul>
                </section>
                <section className="programs">
                    <h2>Nos Programmes</h2>
                    <div className="program-details">
                        <article>
                            <h3>Éducation Précoce</h3>
                            <p>Des programmes éducatifs destinés à stimuler l'apprentissage dès le plus jeune âge avec une attention particulière à la langue et la motricité.</p>
                        </article>
                        <article>
                            <h3>Activités Extérieures</h3>
                            <p>Des activités extérieures quotidiennes pour développer les compétences physiques et sociales dans un cadre sécurisé et stimulant.</p>
                        </article>
                        <article>
                            <h3>Arts et Artisanat</h3>
                            <p>Des ateliers créatifs qui encouragent les enfants à exprimer leur individualité à travers l'art.</p>
                        </article>
                    </div>
                </section>
                <section className="testimonials">
                    <h2>Témoignages</h2>
                    <p>"Un lieu magique où nos enfants apprennent en jouant. Un personnel formidable et un environnement sécurisant." - Marie Dupont</p>
                </section>
                <section className="contact">
                    <h2>Contactez-nous</h2>
                    <div>
                        <p>Adresse: 123 Rue de L'école, Ville</p>
                        <p>Téléphone: 01 23 45 67 89</p>
                        <p>Email: contact@happychild.com</p>
                    </div>

                </section>
            </div>
        </>
    );
}

export default Home;
