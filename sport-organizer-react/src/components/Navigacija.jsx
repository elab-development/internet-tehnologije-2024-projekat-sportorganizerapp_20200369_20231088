import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";

const Navigacija = ({ user, token }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown meni
  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Logout metoda: poziva backend, čisti sessionStorage i preusmerava korisnika na login stranicu
  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      sessionStorage.clear();
      alert("Uspešno odjavljivanje...");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Prvo slovo imena korisnika ili "U" kao default
  const firstLetter = user?.name?.charAt(0).toUpperCase() || "U";

  // Provera: da li je korisnik regularan ("obican_korisnik")
  const isRegularUser = user?.user_type === "obican_korisnik";

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <img src="/images/logo.png" alt="Sportify Logo" className="nav-logo" />
      </div>

      <div className="nav-right">
        {isRegularUser ? (
          <>
            <Link to="/pocetna">Početna</Link>
            <Link to="/dogadjaji">Događaji</Link>
            <Link to="/onama">O Nama</Link>
          </>
        ) : (
          <>
            <Link to="/dogadjaji-moderator">Dogadjaji</Link>
            <Link to="/metrike">Metrike</Link>
          </>
        )}

        <div className="nav-user" onClick={handleDropdown}>
          <div className="avatar">{firstLetter}</div>
          {isRegularUser && <span className="username">{user?.name || "Korisnik"}</span>}
          <FaAngleDown className="dropdown-icon" />

          {dropdownOpen && (
            <div className="dropdown-menu">
              {isRegularUser && (
                <>
                  <Link to="/moj-profil">Moj Profil</Link>
                  <Link to="/moje-rezervacije">Moje Rezervacije</Link>
                </>
              )}
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
