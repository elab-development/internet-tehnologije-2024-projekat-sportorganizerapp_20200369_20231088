import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Prijava = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [poruka, setPoruka] = useState("");
  const [greska, setGreska] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      // Čuvanje korisničkih podataka i tokena u sessionStorage
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          user: res.data.user,
          token: res.data.token,
        })
      );
      setPoruka(res.data.message);
      setGreska("");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setGreska(error.response.data.error);
      } else {
        setGreska("Došlo je do greške pri prijavi.");
      }
      setPoruka("");
    }
  };

  return (
    <div className="auth-container">
      {/* Leva polovina - gradient pozadina i opis */}
      <div className="auth-left">
        <h1>Dobrodošli!</h1>
        <p>
          Otkrijte svet sportskih događaja, organizujte turnire i povežite se sa ljudima istog sportskog duha!
        </p>
      </div>

      {/* Desna polovina - bela pozadina i forma */}
      <div className="auth-right">
        <form onSubmit={handleSubmit} className="auth-form">
          <img src="/images/logo.png" alt="Logo" className="logo" />
          <h2 className="auth-header">Prijava</h2>

          {greska && <p className="auth-error">{greska}</p>}
          {poruka && <p className="auth-success">{poruka}</p>}

          <div className="input-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Unesite vaš email"
                className="input-field"
              />
            </div>
          </div>

          <div className="input-group">
            <label>Lozinka</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Unesite vašu lozinku"
                className="input-field"
              />
            </div>
          </div>

          <button type="submit" className="auth-button">
            Prijavi se
          </button>

          <p className="switch-link">
            Nemate nalog? <Link to="/register">Registruj se</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Prijava;
