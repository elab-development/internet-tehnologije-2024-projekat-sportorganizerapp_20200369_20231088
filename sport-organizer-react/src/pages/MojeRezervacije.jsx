import React, { useState, useEffect } from "react";
import axios from "axios";

const MojeRezervacije = ({ token }) => {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // trenutno editovana rezervacija
  const [updatedRez, setUpdatedRez] = useState({
    broj_karata: "",
    status: "",
  });

  useEffect(() => {
    const fetchRezervacije = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/rezervacije", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRezervacije(response.data.data || response.data);
      } catch (error) {
        console.error("Greška pri učitavanju rezervacija:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRezervacije();
    }
  }, [token]);

  const handleEdit = (rez) => {
    setEditing(rez.id);
    setUpdatedRez({
      broj_karata: rez.broj_karata,
      status: rez.status,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/rezervacije/${id}/azuriraj`, updatedRez, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Rezervacija je uspešno ažurirana!");
      setEditing(null);
      // ponovo učitaj listu rezervacija
      const res = await axios.get("http://127.0.0.1:8000/api/rezervacije", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRezervacije(res.data.data || res.data);
    } catch (err) {
      console.error("Greška pri ažuriranju rezervacije:", err);
      alert("❌ Greška pri ažuriranju rezervacije.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš ovu rezervaciju?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/rezervacije/${id}/obrisi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑️ Rezervacija uspešno obrisana!");
      setRezervacije((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Greška pri brisanju rezervacije:", err);
      alert("❌ Greška pri brisanju rezervacije.");
    }
  };

  if (loading) return <p>Učitavanje rezervacija...</p>;

  return (
    <div className="rezervacije-container">
      <h2>Moje rezervacije</h2>

      {rezervacije.length === 0 ? (
        <p>Nema rezervacija.</p>
      ) : (
        <table className="rezervacije-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Sport</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Lokacija</th>
              <th>Cena karte</th>
              <th>Broj karata</th>
              <th>Ukupna cena</th>
              <th>Status</th>
              <th>Registrovano</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {rezervacije.map((rez, index) => (
              <tr key={rez.id}>
                <td>{index + 1}</td>
                <td>{rez.dogadjaj.vrsta_sporta}</td>
                <td>{rez.dogadjaj.datum}</td>
                <td>{rez.dogadjaj.vreme}</td>
                <td>{rez.dogadjaj.lokacija}</td>
                <td>{rez.dogadjaj.cena_karte} RSD</td>

                {/* Ako je u edit modu — prikazuj inpute */}
                {editing === rez.id ? (
                  <>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={updatedRez.broj_karata}
                        onChange={(e) =>
                          setUpdatedRez({
                            ...updatedRez,
                            broj_karata: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      {(rez.dogadjaj.cena_karte * updatedRez.broj_karata).toFixed(2)} RSD
                    </td>
                    <td>
                      <select
                        value={updatedRez.status}
                        onChange={(e) =>
                          setUpdatedRez({ ...updatedRez, status: e.target.value })
                        }
                      >
                        <option value="aktivna">Aktivna</option>
                        <option value="pauzirana">Pauzirana</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{rez.broj_karata}</td>
                    <td>{rez.ukupna_cena} RSD</td>
                    <td>{rez.status}</td>
                  </>
                )}

                <td>{new Date(rez.created_at).toLocaleDateString()}</td>

              <td className="actions">
  {editing === rez.id ? (
    <>
      <button className="edit-btn" onClick={() => handleUpdate(rez.id)}>
        💾 Sačuvaj
      </button>
      <button className="delete-btn" onClick={() => setEditing(null)}>
        ✖ Otkaži
      </button>
    </>
  ) : (
    <>
      <button className="edit-btn" onClick={() => handleEdit(rez)}>
        ✏️ Uredi
      </button>
      <button className="delete-btn" onClick={() => handleDelete(rez.id)}>
        🗑️ Obriši
      </button>
    </>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeRezervacije;
