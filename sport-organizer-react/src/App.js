import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Prijava from "./pages/Prijava";
import Registracija from "./pages/Registracija";
import Pocetna from "./pages/Pocetna";
import Dogadjaj from "./pages/Dogadjaj";
import Dogadjaji from "./pages/Dogadjaji";
import ONama from "./pages/ONama";
import MojProfil from "./pages/MojProfil";
import Navigacija from "./components/Navigacija";
import Futer from "./components/Futer";
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
      <Routes>
        <Route path="/pocetna" element={<Pocetna />} />
        <Route path="/dogadjaji" element={<Dogadjaji token={token}/>} />
        <Route path="/dogadjaj/:id" element={<Dogadjaj token={token}/>} />
        <Route path="/onama" element={<ONama />} />
        <Route path="/moj-profil" element={<MojProfil user={user} />} />
        <Route path="/" element={<Prijava />} />
        <Route path="/register" element={<Registracija />} />
      </Routes>
      {user &&  <Futer/>}
    </Router>
  );
}

export default App;
