import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Svi slider PNG fajlovi
const imageList = [
  "/images/slider1.png",
  "/images/slider2.png",
  "/images/slider3.png",
  "/images/slider4.png",
  "/images/slider5.png",
  "/images/slider6.png",
  "/images/slider7.png",
  "/images/slider8.png",
  "/images/slider9.png",
  "/images/slider10.png",
  "/images/slider11.png",
  "/images/slider12.png",
  "/images/slider13.png",
  "/images/slider14.png",
  "/images/slider15.png",
];

const Pocetna = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Menjamo sliku svake 3 sekunde
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="pocetna-container">
      <div className="pocetna-hero">
        <div className="hero-text">
          <h1>Dobrodošli na Sportify</h1>
          <p>
            Uživajte u sportskim događajima, organizujte turnire i povežite se
            sa drugim ljubiteljima sporta! Pridružite nam se već danas.
          </p>
          <button className="hero-button" onClick={() => {navigate("/onama")}}>Saznaj više</button>
          <button className="hero-button" onClick={() => {navigate("/dogadjaji")}}>Pogledaj sportske dogadjaje</button>
        </div>

        {/* Deo za hero pozadinu i slider */}
        <div className="hero-bg-container">
          {/* Pozadinska slika (hero.png) se postavlja u CSS-u pomoću background */}
          <div className="hero-bg"></div>

          {/* Sloj za slider slike (sportisti) */}
          <div className="slider-container">
            <img
              key={currentIndex}
              src={imageList[currentIndex]}
              alt="Slider"
              className="slider-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pocetna;
