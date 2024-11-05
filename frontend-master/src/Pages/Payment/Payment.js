import React, { useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar/Navbar";
import "./payment.css";
import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin';


const Payment = () => {
    return (
        <>
            {localStorage.getItem('user') ? <Navbar /> : <NavbarAdmin />}
            <div className="event-list">
                {/* Votre contenu ici */}
            </div>
        </>
    );
};

export default Payment;