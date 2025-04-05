import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

const Navigacija = ({ user, token }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Otvara ili zatvara dropdown meni
  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Metoda za logout: poziva backend i čisti sessionStorage
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      sessionStorage.clear();
      alert("Uspesno odjavljivanje...");
      navigate("/"); // Preusmerava na početnu (login) stranicu
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Prvo slovo imena korisnika, ili default "U"
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="nav-container">
      <div className="nav-left">
        {/* Logo: Proverite da li putanja odgovara vašem assets folderu */}
        <img src="/images/logo.png" alt="Sportify Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        <Link to="/pocetna">Početna</Link>
        <Link to="/dogadjaji">Događaji</Link>
        <Link to="/onama">O Nama</Link>

        <div className="nav-user" onClick={handleDropdown}>
          <div className="avatar">{firstLetter}</div>
          <span className="username">{user?.name || "Korisnik"}</span>
          <FaAngleDown className="dropdown-icon" />

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/moj-profil">Moj Profil</Link>
              <Link to="/moje-rezervacije">Moje Rezervacije</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Odjavi se
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigacija;
