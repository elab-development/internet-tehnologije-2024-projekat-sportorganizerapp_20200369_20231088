import React, { useMemo } from "react";
import useFamousSportsman from "../hooks/useFamousSportsman";

const SlajderPoznatihSportista = ({ names = [] }) => {
  // useMemo garantuje da se niz ne rekreira na svakom renderu
  const stableNames = useMemo(() => names, [names]);
  const { data, loading, error } = useFamousSportsman(stableNames);

  if (loading) return <div className="slider-container">Učitavanje sportista...</div>;
  if (error) return <div className="slider-container">Greška: {error}</div>;

  return (
    <div className="slider-container">
      <h2>Poznati sportisti</h2>
      <div className="slider">
        {data.map((st, idx) => (
          <div key={idx} className="card">
            {st.image ? (
              <img src={st.image} alt={st.name} className="card-image" />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <div className="card-content">
              <h3 className="card-name">{st.name}</h3>
              <p className="card-sport">{st.sport}</p>
              <p className="card-desc">{st.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlajderPoznatihSportista;
