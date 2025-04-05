// src/pages/Dogadjaj.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useImages } from "../hooks/useImages";

const Dogadjaj = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const imageUrl = useImages(event?.vrsta_sporta);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/dogadjaji/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Očekujemo da backend vraća odgovor u formatu: { data: { ... } }
        const resData = response.data;
        setEvent(resData.data || resData);
      } catch (error) {
        console.error("Greška pri učitavanju detalja događaja:", error);
      }
    };

    if (token) {
      fetchEvent();
    }
  }, [id, token]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const handleRezervisi = async () => {
    try {
      const payload = {
        dogadjaj_id: event.id,
        broj_karata: 1, // default broj karata, možete prilagoditi
      };

      await axios.post(
        `http://127.0.0.1:8000/api/rezervacije`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Uspešno ste rezervisali događaj!");
      navigate("/dogadjaji");
    } catch (error) {
      console.error("Greška pri rezervaciji događaja:", error);
      alert("Greška pri rezervaciji događaja.");
    }
  };

  return (
    <div className="dogadjaj-detalji-wrapper">
      <div className="dogadjaj-detalji-card">
        <img
          src={imageUrl || "/images/placeholder.png"}
          alt={event.vrsta_sporta}
          className="dogadjaj-img"
        />
        <div className="dogadjaj-content">
          <h2 className="dogadjaj-naslov">
            {event.tip_dogadjaja.toUpperCase()} - {event.vrsta_sporta.toUpperCase()}
          </h2>
          <p className="dogadjaj-cena">
            <strong>Cena:</strong> {event.cena_karte} RSD
          </p>
          <p>
            <strong>Datum:</strong> {event.datum}
          </p>
          <p>
            <strong>Vreme:</strong> {event.vreme}
          </p>
          <p>
            <strong>Lokacija:</strong> {event.lokacija}
          </p>
          <button className="rezervisi-btn" onClick={handleRezervisi}>
            Rezerviši
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dogadjaj;
