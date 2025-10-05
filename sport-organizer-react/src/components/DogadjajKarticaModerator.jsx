import React from "react";
import { useImages } from "../hooks/useImages";

const DogadjajKarticaModerator = ({ event, onEdit, onDelete }) => {
  const imageUrl = useImages(event.vrsta_sporta);

  return (
    <div className="dogadjaj-card">
      <div className="card-image">
        <img src={imageUrl || "/images/placeholder.png"} alt={event.vrsta_sporta} />
      </div>
      <div className="card-body">
        <h3 className="dog-tip">
          {event.tip_dogadjaja}, {event.vrsta_sporta}
        </h3>
        <p className="dog-detalji">
          Datum: {event.datum} <br />
          Vreme: {event.vreme} <br />
          Lokacija: {event.lokacija}
        </p>
        <p className="dog-cena">Cena: {event.cena_karte} RSD</p>
        {/* Dugme "Pogledaj više" je izostavljeno za moderatore */}
        <div className="actions">
          <button onClick={onEdit}>✏️ Uredi</button>
          <button onClick={onDelete}>🗑️ Obriši</button>
        </div>
      </div>
    </div>
  );
};

export default DogadjajKarticaModerator;
