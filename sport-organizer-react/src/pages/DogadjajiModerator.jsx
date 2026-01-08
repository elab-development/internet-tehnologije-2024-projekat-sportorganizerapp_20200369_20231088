import React, { useState, useEffect } from "react";
import axios from "axios";
import DogadjajKarticaModerator from "../components/DogadjajKarticaModerator";

const DogadjajiModerator = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [filterVrsta, setFilterVrsta] = useState("");
  const [sortCena, setSortCena] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tipovi, setTipovi] = useState([]);

  const [newEvent, setNewEvent] = useState({
    vrsta_sporta: "",
    datum: "",
    vreme: "",
    lokacija: "",
    tip_dogadjaja: "",
    cena_karte: "",
  });

  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    if (token) {
      fetchEvents();
      fetchTipovi();
    }
  }, [filterVrsta, currentPage, token]);

  const fetchEvents = async () => {
    try {
      const params = { page: currentPage };
      if (filterVrsta) params.vrsta_sporta = filterVrsta;

      const res = await axios.get("http://127.0.0.1:8000/api/dogadjaji", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setEvents(res.data.data);
      setTotalPages(res.data.meta.last_page);
    } catch (err) {
      console.error("Greška pri učitavanju događaja:", err);
    }
  };

  const fetchTipovi = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tipovi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTipovi(res.data.data);
    } catch (err) {
      console.error("Greška pri učitavanju tipova:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/dogadjaji", newEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewEvent({
        vrsta_sporta: "",
        datum: "",
        vreme: "",
        lokacija: "",
        tip_dogadjaja: "",
        cena_karte: "",
      });
      fetchEvents();
      alert("✅ Događaj uspešno dodat!");
    } catch (err) {
      console.error("Greška pri dodavanju događaja:", err.response?.data || err);
      alert("❌ Greška: proveri da li su sva polja popunjena.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/dogadjaji/${editingEvent.id}`,
        editingEvent,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingEvent(null);
      fetchEvents();
      alert("✏️ Događaj uspešno ažuriran!");
    } catch (err) {
      console.error("Greška pri ažuriranju:", err);
      alert("❌ Došlo je do greške pri ažuriranju događaja.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš događaj?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dogadjaji/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
      alert("🗑️ Događaj uspešno obrisan!");
    } catch (err) {
      console.error("Greška pri brisanju:", err);
    }
  };

  const exportToExcel = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/dogadjaji/export",
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dogadjaji.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Greška pri exportu:", err);
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (sortCena === "asc") return a.cena_karte - b.cena_karte;
    if (sortCena === "desc") return b.cena_karte - a.cena_karte;
    return 0;
  });

  return (
    <div className="dogadjaji-container">
      <h2>Upravljanje događajima</h2>

      {/* Export */}
      <button className="export-btn" onClick={exportToExcel}>
        📊 Exportuj u Excel
      </button>

      {/* Forma za dodavanje / izmenu */}
      <form
        className="event-form"
        onSubmit={editingEvent ? handleUpdate : handleCreate}
      >
        <h3>{editingEvent ? "Ažuriraj događaj" : "Dodaj novi događaj"}</h3>

        {/* Vrsta sporta */}
        <input
          type="text"
          placeholder="Vrsta sporta"
          value={
            editingEvent ? editingEvent.vrsta_sporta : newEvent.vrsta_sporta
          }
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({
                  ...editingEvent,
                  vrsta_sporta: e.target.value,
                })
              : setNewEvent({ ...newEvent, vrsta_sporta: e.target.value })
          }
          required
        />

        {/* Datum */}
        <input
          type="date"
          value={editingEvent ? editingEvent.datum : newEvent.datum}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, datum: e.target.value })
              : setNewEvent({ ...newEvent, datum: e.target.value })
          }
          required
        />

        {/* Vreme */}
        <input
          type="time"
          value={editingEvent ? editingEvent.vreme : newEvent.vreme}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, vreme: e.target.value })
              : setNewEvent({ ...newEvent, vreme: e.target.value })
          }
          required
        />

        {/* Lokacija */}
        <input
          type="text"
          placeholder="Lokacija"
          value={editingEvent ? editingEvent.lokacija : newEvent.lokacija}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, lokacija: e.target.value })
              : setNewEvent({ ...newEvent, lokacija: e.target.value })
          }
          required
        />

        {/* Tip događaja */}
        <select
          value={
            editingEvent ? editingEvent.tip_dogadjaja : newEvent.tip_dogadjaja
          }
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({
                  ...editingEvent,
                  tip_dogadjaja: e.target.value,
                })
              : setNewEvent({ ...newEvent, tip_dogadjaja: e.target.value })
          }
          required
        >
          <option value="">Odaberi tip događaja</option>
          {tipovi.map((tip) => (
            <option key={tip.id} value={tip.id}>
              {tip.naziv}
            </option>
          ))}
        </select>

        {/* Cena */}
        <input
          type="number"
          placeholder="Cena karte"
          value={editingEvent ? editingEvent.cena_karte : newEvent.cena_karte}
          onChange={(e) =>
            editingEvent
              ? setEditingEvent({ ...editingEvent, cena_karte: e.target.value })
              : setNewEvent({ ...newEvent, cena_karte: e.target.value })
          }
          required
        />

        <button type="submit">
          {editingEvent ? "Sačuvaj izmene" : "Dodaj događaj"}
        </button>
        {editingEvent && (
          <button
            type="button"
            onClick={() => setEditingEvent(null)}
            className="cancel-btn"
          >
            Otkaži
          </button>
        )}
      </form>

      {/* Filteri */}
      <div className="filters">
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
          <option value="rukomet">Rukomet</option>
          <option value="odbojka">Odbojka</option>
        </select>

        <label>Sortiraj po ceni:</label>
        <select value={sortCena} onChange={(e) => setSortCena(e.target.value)}>
          <option value="">Bez sortiranja</option>
          <option value="asc">Rastuće</option>
          <option value="desc">Opadajuće</option>
        </select>
      </div>

      {/* Lista događaja */}
      <div className="dogadjaji-grid">
        {sortedEvents.map((event) => (
          <DogadjajKarticaModerator
            key={event.id}
            event={event}
            onEdit={() => setEditingEvent(event)}
            onDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>

      {/* Paginacija */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DogadjajiModerator;
