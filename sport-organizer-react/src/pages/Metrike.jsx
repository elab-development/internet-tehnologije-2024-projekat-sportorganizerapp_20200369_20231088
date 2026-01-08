import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Metrike = ({ token }) => {
  const [metrics, setMetrics] = useState(null);
  const [distribution, setDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lista svih sportova kako je u bazi
  const allSports = [
    "hokej", "kosarka", "vaterpolo", "fudbal", "ragbi", "americki fudbal", "stoni tenis",
    "badminton", "golf", "kuglanje", "bilijar", "streljastvo", "atletika", "odbojka",
    "rukomet", "plivanje", "skakanje u vodu", "karate", "dzudo", "boks", "mma", "rvanje",
  ];

  // Paleta boja – 22 boje
  const colorPalette = [
    "#34a853", "#ff9800", "#3f51b5", "#e91e63", "#9c27b0", "#009688",
    "#00bcd4", "#4caf50", "#ff5722", "#795548", "#9e9e9e", "#673ab7",
    "#2196f3", "#cddc39", "#f44336", "#607d8b", "#8bc34a", "#03a9f4",
    "#e91e63", "#ffeb3b", "#8e24aa", "#43a047"
  ];

  useEffect(() => {
    // Učitavanje osnovnih metrika (najviše događaja po sportu i mesecu)
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/dogadjaji/metrics`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMetrics(res.data);
      } catch (error) {
        console.error("Greška pri učitavanju metrika:", error);
      }
    };

    // Učitavanje svih događaja kako bismo izračunali distribuciju po sportu
    const fetchAllEvents = async () => {
      try {
        // Učitavamo prvu stranicu da dobijemo meta podatke
        const firstRes = await axios.get(
          `http://127.0.0.1:8000/api/dogadjaji`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1 },
          }
        );
        const firstPageData = firstRes.data.data;
        const lastPage = firstRes.data.meta.last_page;
        let allEvents = [...firstPageData];

        // Kreiramo niz zahteva za ostale stranice
        const pageRequests = [];
        for (let page = 2; page <= lastPage; page++) {
          pageRequests.push(
            axios.get(`http://127.0.0.1:8000/api/dogadjaji`, {
              headers: { Authorization: `Bearer ${token}` },
              params: { page },
            })
          );
        }

        const responses = await Promise.all(pageRequests);
        responses.forEach((res) => {
          allEvents = allEvents.concat(res.data.data);
        });

        // Inicijalizujemo distribucioni objekat za sve sportove sa 0
        const distObj = {};
        allSports.forEach((sport) => {
          distObj[sport] = 0;
        });

        allEvents.forEach((ev) => {
          const sport = ev.vrsta_sporta;
          if (distObj.hasOwnProperty(sport)) {
            distObj[sport] += 1;
          } else {
            distObj[sport] = 1;
          }
        });

        const distributionArray = Object.entries(distObj).map(([sport, broj]) => ({
          vrsta_sporta: sport,
          broj,
        }));

        setDistribution(distributionArray);
      } catch (error) {
        console.error("Greška pri učitavanju svih događaja za distribuciju:", error);
      }
    };

    if (token) {
      Promise.all([fetchMetrics(), fetchAllEvents()]).finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) {
    return <p className="metrics-loading">Učitavanje metrika...</p>;
  }

  if (!metrics) {
    return <p className="metrics-error">Nema metrika za prikaz.</p>;
  }

  // Osnovne metrike
  const najviseSport = metrics.najvise_dogadjaja_po_sportu;
  const najviseMesec = metrics.najvise_dogadjaja_po_mesecu;

  // Prevedi mesec u naziv
  const monthNames = [
    "Januar", "Februar", "Mart", "April", "Maj", "Jun",
    "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
  ];
  const monthIndex = (najviseMesec?.mesec || 1) - 1;
  const monthLabel = monthNames[monthIndex] || `Mesec ${najviseMesec?.mesec}`;

  // Podaci za Bar grafikon – distribucija događaja po sportu
  const distributionLabels = distribution.map((item) => item.vrsta_sporta);
  const distributionValues = distribution.map((item) => item.broj);

  const backgroundColors = distributionLabels.map(
    (_, i) => colorPalette[i % colorPalette.length]
  );
  const borderColors = distributionLabels.map(() => "#fff");

  const distributionData = {
    labels: distributionLabels,
    datasets: [
      {
        data: distributionValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: "#333" },
        grid: { color: "#f0f0f0" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#333" },
        grid: { color: "#f0f0f0" },
      },
    },
  };

  return (
    <div className="metrike-container">
      <h2 className="metrics-title">Metrike</h2>

      {/* Prikaz osnovnih metrika kao brojevi */}
      <div className="metrics-summary">
        <div className="summary-card">
          <h3>Najviše događaja po sportu</h3>
          {najviseSport ? (
            <p>
              <strong>{najviseSport.vrsta_sporta}</strong> – {najviseSport.broj} događaja
            </p>
          ) : (
            <p>Nema podataka</p>
          )}
        </div>
        <div className="summary-card">
          <h3>Najviše događaja po mesecu</h3>
          {najviseMesec ? (
            <p>
              <strong>{monthLabel}</strong> – {najviseMesec.broj} događaja
            </p>
          ) : (
            <p>Nema podataka</p>
          )}
        </div>
      </div>

      {/* Bar grafikon raspodele događaja po sportu */}
      <div className="distribution-section">
        <h3 className="distribution-title">Raspodela događaja po sportu</h3>
        <div className="chart-wrapper">
          <Bar data={distributionData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Metrike;
