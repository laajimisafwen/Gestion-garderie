import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../Components/NavbarAdmin/NavbarAdmin";
import "./AdminParents.css";
import NavbarResponsable from "../../Components/NavbarResponsable/NavbarResponsable";

const AdminParents = () => {
  const [parents, setParents] = useState([]);
  const [listType, setListType] = useState("all");
  const [selectedParent, setSelectedParent] = useState(null);
  const [parentForm, setParentForm] = useState({
    username: "",
    access: false,
    avis: "",
    enfants: "",
    email: "",
  });

  const fetchParentsList = async () => {
    let url = "http://localhost:3001/api/user/parents";
    if (listType === "abonne") {
      url += "/sub-parents";
    } else if (listType === "non-abonne") {
      url += "/new-parents";
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setParents(data);
    } catch (error) {
      console.error("Error fetching parents:", error);
    }
  };

  useEffect(() => {
    fetchParentsList();
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
    setParentForm({
      ...parentForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditClick = (parent) => {
    setSelectedParent(parent._id);
    setParentForm({
      username: parent.username,
      access: parent.access,
      avis: parent.avis,
      enfants: parent.enfants,
      email: parent.email,
    });
  };

  const handleDeleteParent = async (parentId) => {
    if (window.confirm("Are you sure you want to delete this child?")) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user/parents/${parentId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        fetchParentsList();
      } catch (error) {
        console.error("Error deleting enfant:", error);
      }
    }
  };

  const handleUpdateParent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/parents/${selectedParent}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parentForm),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      fetchParentsList();
      setSelectedParent(null);
    } catch (error) {
      console.error("Error updating enfant:", error);
    }
  };

  const handleAccessParent = async (parentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/parents/access/${parentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parentForm),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      fetchParentsList();
      setSelectedParent(null);
    } catch (error) {
      console.error("Error updating enfant:", error);
    }
  };

  return (
    <>
      {localStorage.getItem("admin") ? <NavbarAdmin /> : <NavbarResponsable />}
      <div className="parents-container">
        <div className="parents-actions">
          <button  onClick={() => setListType("all")}>Tous</button>
          <button onClick={() => setListType("abonne")}>avoir accès</button>
          <button onClick={() => setListType("non-abonne")}>Nouveau</button>
        </div>
        <br />
        <br />
        <div className="parents-list">
          {parents.map((parent) => (
            <React.Fragment key={parent._id}>
              <div className="parents-card">
                <div className="parents-info">
                  <p>Nom et prénom: {parent.username}</p>
                  <p>Accés: {parent.access ? "Oui" : "Non"}</p>
                  <p>Avis: {parent.avis || "Null"}</p>
                  <p>Enfants: {parent.enfants.length || "0"}</p>
                  {parent.enfants &&
                    parent.enfants.length > 0 &&
                    parent.enfants.map((enfant) => (
                      <p>{enfant.username || "0"}</p>
                    ))}
                  <p>Email: {parent.email || "None"}</p>
                </div>
                <div className="parents-actions">
                  <button onClick={() => handleEditClick(parent)}>
                    Modifier
                  </button>

                  <button onClick={() => handleDeleteParent(parent._id)}>
                    Supprimer
                  </button>
                  {!parent.access && (
                    <button onClick={() => handleAccessParent(parent._id)}>
                      Access
                    </button>
                  )}
                </div>
              </div>
              {selectedParent === parent._id && (
                <div className="parents-edit-form">
                  <input
                    type="text"
                    name="username"
                    placeholder="Nom et prénom"
                    value={parentForm.username}
                    onChange={handleFormChange}
                  />
                  <input
                    type="checkbox"
                    name="access"
                    checked={parentForm.access}
                    onChange={handleFormChange}
                  />{" "}
                  Accés
                  <br />
                  <br />
                  <label>Avis: </label>
                  <input
                    type="number"
                    name="avis"
                    checked={parentForm.avis}
                    onChange={handleFormChange}
                  />{" "}
                  <br />
                  <br />
                  <label>Email: </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email..."
                    value={parentForm.email}
                    onChange={handleFormChange}
                  />{" "}
                  <br />
                  <br />
                  <div className="parent-edit-action">
                    <button onClick={() => handleUpdateParent(parent._id)}>
                      Modier
                    </button>
                    <button onClick={() => setSelectedParent(null)}>
                      Annuler
                    </button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminParents;
