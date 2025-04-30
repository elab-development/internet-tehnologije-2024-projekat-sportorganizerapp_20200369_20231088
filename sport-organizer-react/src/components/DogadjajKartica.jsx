import React from "react";
import { Link } from "react-router-dom";
import { useImages } from "../hooks/useImages";

const DogadjajKartica = ({ event }) => {
  const imageUrl = useImages(event.vrsta_sporta);

  return (
    <div className="dogadjaj-card">
      <div className="card-image">
        <img
          src={imageUrl || "/images/placeholder.png"}
          alt={event.vrsta_sporta}
        />
      </div>
      <div className="card-body">
        <h3 className="dog-tip">
          {event.tip_dogadjaja}, {event.vrsta_sporta}
        </h3>
        <p className="dog-detalji">
          Datum: {event.datum}
          <br />
          Vreme: {event.vreme}
          <br />
          Lokacija: {event.lokacija}
        </p>
        <p className="dog-cena">Cena: {event.cena_karte} RSD</p>
        <Link to={`/dogadjaj/${event.id}`} className="pogledaj-vise-btn">
          Pogledaj više
        </Link>
      </div>
    </div>
  );
};

export default DogadjajKartica;
