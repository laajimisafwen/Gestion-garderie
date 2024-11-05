import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';

import Signup from './Pages/Signup/Signup';
import Signin from "./Pages/Signin/Signin";
import Home from "./Pages/Home/Home";
import HomeAdmin from "./Pages/Home/AdminHome/Home";
import Evenement from "./Pages/Evenement/Evenement";
import Enfant from "./Pages/Enfant/Enfant";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import EnfantAdmin from "./Pages/Enfant/Admin/Enfant";
import AdminParents from "./Pages/AdminParents/AdminParents";
import EvenementAdmin from "./Pages/Evenement/Admin/Evenement";
import AdminResponsable from "./Pages/AdminResponsable/AdminResponsable";
import ResponsableLogin from "./Pages/ResponsableLogin/ResponsableLogin";
import ContactForm from "./Pages/ContactForm/ContactForm";
import Tarif from "./Pages/Tarif/Tarif";
import Apropos from "./Pages/Apropos/Apropos"
import Payment from "./Pages/Payment/Admin/payment";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/evenements" element={<Evenement />} />
          <Route path="/enfant" element={<Enfant />} />
          <Route path="/enfant-admin" element={<EnfantAdmin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-parent" element={<AdminParents />} />
          <Route path="/evenements-admin" element={<EvenementAdmin />} />
          <Route path="/responsables" element={<AdminResponsable />} />
          <Route path="/responsable-login" element={<ResponsableLogin />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/tarif" element={<Tarif />} />
          <Route path="/Apropos" element={<Apropos />} />
          <Route path="/payment" element={<Payment />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
