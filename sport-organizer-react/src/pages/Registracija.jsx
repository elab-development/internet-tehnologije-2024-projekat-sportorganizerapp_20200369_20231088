import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Registracija = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("obican_korisnik");
  const [poruka, setPoruka] = useState("");
  const [greska, setGreska] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        user_type: userType,
      });
      setPoruka(res.data.message);
      setGreska("");
    } catch (error) {
      if (error.response && error.response.data) {
        setGreska(
          error.response.data.error ||
            "Došlo je do greške pri registraciji."
        );
      } else {
        setGreska("Došlo je do greške pri registraciji.");
      }
      setPoruka("");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Logo */}
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h2 className="auth-header">Registracija</h2>
        {greska && <p className="auth-error">{greska}</p>}
        {poruka && <p className="auth-success">{poruka}</p>}
        <div className="input-group">
          <label>Ime</label>
          <div className="input-wrapper">
            <FaUser className="input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Unesite vaše ime"
              className="input-field"
            />
          </div>
        </div>
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
        <div className="select-group">
          <label>Tip korisnika</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="obican_korisnik">Običan korisnik</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
        <button type="submit" className="auth-button">
          Registruj se
        </button>
        <p className="switch-link">
          Već imate nalog? <Link to="/login">Prijavite se</Link>
        </p>
      </form>
    </div>
  );
};

export default Registracija;
