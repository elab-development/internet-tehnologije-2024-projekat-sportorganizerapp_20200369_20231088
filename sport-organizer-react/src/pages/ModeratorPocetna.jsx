import React from "react";
import { useNavigate } from "react-router-dom";

const ModeratorPocetna = () => {
  const navigate = useNavigate();

  return (
    <div className="pocetna-container1">
      <div className="pocetna-hero1">
        <div className="hero-text1">
          <h1>Dobrodošli, Moderatore!</h1>
          <p>
            Upravljajte sportskim događajima, pratite metrike i vodite svoje timove do uspeha!
            Iskoristite našu platformu za efikasno upravljanje i praćenje svih događaja.
          </p>
          <div className="hero-buttons1">
            <button
              className="hero-button1"
              onClick={() => navigate("/dogadjaji-moderator")}
            >
              Pogledaj događaje
            </button>
            <button
              className="hero-button1"
              onClick={() => navigate("/metrike")}
            >
              Pogledaj metrike
            </button>
          </div>
        </div>

        <div className="hero-bg-container1">
          {/* Pozadinska slika se postavlja preko CSS-a */}
          <div className="hero-bg1"></div>
          <div className="img-container1">
            <img src="/images/moderator.png" className="moderator-img"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorPocetna;
