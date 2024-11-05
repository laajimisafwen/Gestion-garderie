import React, { useState, useEffect } from "react";
import "./Payment.css";
import NavbarAdmin from "../../../Components/NavbarAdmin/NavbarAdmin";
import NavbarResponsable from "../../../Components/NavbarResponsable/NavbarResponsable";

const Payment = () => {
  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const fetchEnfantsList = async () => {
      let url = "http://localhost:3001/api/user/enfants";
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setEnfants(data);
      } catch (error) {
        console.error("Error fetching enfants:", error);
      }
    };
    fetchEnfantsList();
  }, []);

  const handleEdit = async (id, subscription) => {
    if (window.confirm("Are you sure you want to change subscription for this child?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/enfants/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subscription: !subscription }),
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        setEnfants((prevEnfants) => prevEnfants.map(enfant => 
          enfant._id === id ? { ...enfant, subscription: !subscription } : enfant
        ));
      } catch (error) {
        console.error("Error updating enfant:", error);
      }
    }
  };

  return (
    <>
      {localStorage.getItem("admin") ? <NavbarAdmin /> : <NavbarResponsable />}
      <div className="payment-container">
        <h1 className="payment-title">Paiement</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th scope="col">Enfant</th>
                <th scope="col">Parent</th>
                <th scope="col">Payer</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {enfants &&
                enfants.length > 0 &&
                enfants.map((enfant) => (
                  <tr key={enfant._id}>
                    <td>{enfant.username}</td>
                    <td>{enfant.parent.username}</td>
                    <td>{enfant.subscription ? "Oui" : "Non"}</td>
                    <td>
                      <button
                        className="payment-button"
                        onClick={() => handleEdit(enfant._id, enfant.subscription)}
                      >
                        {enfant.subscription ? "Annuler" : "Paiement"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payment;