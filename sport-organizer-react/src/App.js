import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Pocetna from "./pages/Pocetna";
import Dogadjaj from "./pages/Dogadjaj";
import Dogadjaji from "./pages/Dogadjaji";
import DogadjajiModerator from "./pages/DogadjajiModerator";
import ONama from "./pages/ONama";
import MojProfil from "./pages/MojProfil";
import MojeRezervacije from "./pages/MojeRezervacije";
import ModeratorPocetna from "./pages/ModeratorPocetna";
import Metrike from "./pages/Metrike";
import Navigacija from "./components/Navigacija";
import Futer from "./components/Futer";
import Breadcrumbs from "./components/Breadcrumbs";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Postavljamo interval da proverava svakih 1000 ms (1 sekundu)
    const interval = setInterval(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setUser(parsed.user);
          setToken(parsed.token);
        } catch (error) {
          console.error("Greska pri parsiranju userData:", error);
          setUser(null);
          setToken(null);
        }
      } else {
        setUser(null);
      }
    }, 1000);

    // Čišćenje intervala kada se komponenta demontira
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      {user &&  <Navigacija user={user} token={token} />}
      {user && <Breadcrumbs user={user} />}
      <Routes>
        <Route path="/pocetna" element={<Pocetna />} />
        <Route path="/pocetna-moderator" element={<ModeratorPocetna />} />
        <Route path="/dogadjaji" element={<Dogadjaji token={token}/>} />
        <Route path="/dogadjaji-moderator" element={<DogadjajiModerator token={token}/>} />
        <Route path="/dogadjaj/:id" element={<Dogadjaj token={token}/>} />
        <Route path="/metrike" element={<Metrike token={token}/>} />
        <Route path="/onama" element={<ONama />} />
        <Route path="/moj-profil" element={<MojProfil user={user} />} />
        <Route path="/moje-rezervacije" element={<MojeRezervacije token={token} />} />
        <Route path="/" element={<Prijava />} />
        <Route path="/register" element={<Registracija />} />
      </Routes>
      {user &&  <Futer/>}
    </Router>
  );
}

export default App;
