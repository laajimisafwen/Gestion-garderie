import React, { useEffect } from 'react';
import Navbar from "../../../Components/Navbar/Navbar";
import NavbarAdmin from "../../../Components/NavbarAdmin/NavbarAdmin";
import './Home.css';
import NavbarResponsable from '../../../Components/NavbarResponsable/NavbarResponsable';

const Home = () => {

    useEffect(() => {
        const originalBackground = document.body.style.backgroundImage;
        document.body.style.backgroundImage = "none";

        return () => {
            document.body.style.backgroundImage = originalBackground;
        };
    }, []);


    return (
        <>
            {
                (() => {
                    if (localStorage.getItem('admin')) {
                        return <NavbarAdmin />;
                    } else if (localStorage.getItem('responsable')) {
                        return <NavbarResponsable />;
                    } else {
                        return <Navbar />;
                    }
                })()
            }
            <div className="home-page">
                <iframe
                    style={{
                        background: '#F1F5F4',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        width: '100vw',
                        height: '70vh'
                    }}
                    src="https://charts.mongodb.com/charts-happychild-fjszu/embed/dashboards?id=0f76e0e9-558e-424f-af4f-8da08f4a99d1&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
                    title="MongoDB Charts"
                    allowFullScreen
                ></iframe>
                <iframe
                    style={{
                        background: '#F1F5F4',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        width: '100vw',
                        height: '70vh'
                    }}
                    src="https://charts.mongodb.com/charts-happychild-fjszu/embed/dashboards?id=5f912ff7-fe7d-4757-a511-efdc688dd3ac&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
                    title="MongoDB Charts"
                    allowFullScreen
                ></iframe>
                <iframe
                    style={{
                        background: '#F1F5F4',
                        border: 'none',
                        borderRadius: '2px',
                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                        width: '100vw',
                        height: '70vh'
                    }}
                    src="https://charts.mongodb.com/charts-happychild-fjszu/embed/dashboards?id=548247f8-d4c1-450b-9a8d-8ba3aeb7b3be&theme=light&autoRefresh=true&maxDataAge=60&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
                    title="MongoDB Charts Dashboard"
                    allowFullScreen
                ></iframe>


            </div>
        </>

    );
};

export default Home;