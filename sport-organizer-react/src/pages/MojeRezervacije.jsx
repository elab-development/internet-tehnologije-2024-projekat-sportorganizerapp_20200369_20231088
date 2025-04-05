// src/pages/MojeRezervacije.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const MojeRezervacije = ({ token }) => {
  const [rezervacije, setRezervacije] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRezervacije = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/rezervacije`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Očekujemo da backend vraća paginirani ili nepaginirani niz rezervacija u formatu RezervacijaResource
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

  if (loading) {
    return <p>Učitavanje rezervacija...</p>;
  }

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
              <th>Događaj</th>
              <th>Datum</th>
              <th>Vreme</th>
              <th>Lokacija</th>
              <th>Cena karte</th>
              <th>Broj karata</th>
              <th>Ukupna cena</th>
              <th>Status</th>
              <th>Registrovano</th>
            </tr>
          </thead>
          <tbody>
            {rezervacije.map((rez, index) => (
              <tr key={rez.id}>
                <td>{index + 1}</td>
                <td>
                    {rez.dogadjaj.vrsta_sporta}
                </td>
                <td>{rez.dogadjaj.datum}</td>
                <td>{rez.dogadjaj.vreme}</td>
                <td>{rez.dogadjaj.lokacija}</td>
                <td>{rez.dogadjaj.cena_karte} RSD</td>
                <td>{rez.broj_karata}</td>
                <td>{rez.ukupna_cena} RSD</td>
                <td>{rez.status}</td>
                <td>{new Date(rez.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MojeRezervacije;
