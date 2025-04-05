// src/pages/Dogadjaji.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import DogadjajKartica from "../components/DogadjajKartica";

const Dogadjaji = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [filterTip, setFilterTip] = useState("");
  const [filterVrsta, setFilterVrsta] = useState("");
  const [filterNaziv, setFilterNaziv] = useState("");
  const [sortCena, setSortCena] = useState(""); // "asc" ili "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = { page: currentPage };
        if (filterTip) params.tip_dogadjaja = filterTip;
        if (filterVrsta) params.vrsta_sporta = filterVrsta;
        if (filterNaziv) params.naziv = filterNaziv;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/dogadjaji`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params,
          }
        );

        // Očekujemo standardni Laravel paginirani odgovor:
        // { data: [...], meta: { current_page, last_page, ... } }
        const resData = response.data;
        setEvents(resData.data);
        setTotalPages(resData.meta.last_page);
      } catch (error) {
        console.error("Greška pri učitavanju događaja:", error);
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [filterTip, filterVrsta, filterNaziv, currentPage, token]);

  // Sortiramo učitane događaje (na trenutnoj stranici) po ceni ako je odabrano sortiranje
  const sortedEvents = [...events].sort((a, b) => {
    if (sortCena === "asc") {
      return a.cena_karte - b.cena_karte;
    } else if (sortCena === "desc") {
      return b.cena_karte - a.cena_karte;
    }
    return 0;
  });

  return (
    <div className="dogadjaji-container">
      <h2>Dogadjaji</h2>

      {/* Filter sekcija */}
      <div className="filters">
        <div>
          <label>Vrsta sporta:</label>
          <select
            value={filterVrsta}
            onChange={(e) => {
              setFilterVrsta(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Sve</option>
            <option value="fudbal">Fudbal</option>
            <option value="kosarka">Košarka</option>
            <option value="tenis">Tenis</option>
            <option value="ragbi">Ragbi</option>
            <option value="hokej">Hokej</option>
            <option value="vaterpolo">Vaterpolo</option>
            <option value="plivanje">Plivanje</option>
            <option value="atletika">Atletika</option>
            <option value="kajak">Kajak</option>
            <option value="americki fudbal">Američki fudbal</option>
            <option value="stoni tenis">Stoni tenis</option>
            <option value="badminton">Badminton</option>
            <option value="golf">Golf</option>
            <option value="kuglanje">Kuglanje</option>
            <option value="bilijar">Bilijar</option>
            <option value="streljastvo">Streljaštvo</option>
            <option value="odbojka">Odbojka</option>
            <option value="rukomet">Rukomet</option>
            <option value="skakanje u vodu">Skakanje u vodu</option>
            <option value="karate">Karate</option>
            <option value="dzudo">Džudo</option>
            <option value="boks">Boks</option>
            <option value="mma">MMA</option>
            <option value="rvanje">Rvanje</option>
          </select>
        </div>
        <div>
          <label>Sortiraj po ceni:</label>
          <select
            value={sortCena}
            onChange={(e) => {
              setSortCena(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Bez sortiranja</option>
            <option value="asc">Rastuće</option>
            <option value="desc">Opadajuće</option>
          </select>
        </div>
      </div>

      {/* Grid prikaz kartica */}
      <div className="dogadjaji-grid">
        {sortedEvents.map((event) => (
          <DogadjajKartica key={event.id} event={event} />
        ))}
      </div>

      {/* Paginacija – koristi broj stranica iz meta podataka */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? "active-page" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dogadjaji;
