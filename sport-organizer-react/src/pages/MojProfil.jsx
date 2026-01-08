import React from "react";

const MojProfil = ({ user }) => {
  // Ako user nije definisan, prikazujemo "Loading..."
  if (!user) {
    return <p>Loading profile...</p>;
  }

  // Inicijal iz imena korisnika (veliko slovo)
  const initialLetter = user?.name?.[0]?.toUpperCase() || "?";

  return (
    <div className="profil-container">
      {/* Leva strana: kružni avatar i ime */}
      <div className="profil-left">
        <div className="profil-avatar">
          <span className="avatar-letter">{initialLetter}</span>
        </div>
        <p className="profil-name">{user.name}</p>
      </div>

      {/* Desna strana: velika zaobljena kartica sa ostalim detaljima */}
      <div className="profil-right">
        <h2 className="profil-title">Moj profil</h2>
        <div className="profil-details">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Tip korisnika:</strong> {user.user_type}
          </p>
          {/* Dodajte još polja po potrebi, npr. datum registracije, phone itd. */}
          {user.created_at && (
            <p>
              <strong>Registrovan:</strong> {new Date(user.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MojProfil;
