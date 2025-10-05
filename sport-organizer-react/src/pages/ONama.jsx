import React from "react";
import SlajderPoznatihSportista from "../components/SlajderPoznatihSportista";

const ONama = () => {
  const sportisti = ["Lionel Messi", "Novak Djokovic", "LeBron James", "Usain Bolt", "Roger Federer"];

  return (
    <div className="onama-container">
      {/* Gornji naslov i kratak opis */}
      <section className="onama-hero">
        <h1 className="onama-title">O Sportify aplikaciji</h1>
        <p className="onama-subtitle">
          Sportify je inovativna platforma za organizaciju sportskih događaja, 
          turnira i treninga. Povezujemo ljubitelje sporta i olakšavamo 
          planiranje, rezervacije i druženje u sportskom duhu.
        </p>
      </section>

      {/* Sekcija "Meet the Principals" */}
      <section className="onama-meet">
        <h2 className="meet-title">Upoznajte naše direktore</h2>
        <div className="principals">
          <div className="principal-card">
            <img src="/images/ceo1.png" alt="CEO 1" className="principal-img" />
            <h3 className="principal-name">Luka Marković</h3>
            <p className="principal-role">Osnivač i direktor</p>
            <p className="principal-desc">
              Luka je odgovoran za strateško vođenje Sportify tima. 
              Posevećen je inovacijama i izgradnji zajednice ljubitelja sporta.
            </p>
          </div>
          <div className="principal-card">
            <img src="/images/ceo2.png" alt="CEO 2" className="principal-img" />
            <h3 className="principal-name">Milojko Petrović</h3>
            <p className="principal-role">Suosnivač i operativni direktor</p>
            <p className="principal-desc">
              Milojko se bavi razvojem platforme i koordinacijom projekata. 
              Njegova strast prema sportu inspiriše ceo tim.
            </p>
          </div>
        </div>
      </section>

      {/* Donja sekcija - socijalne mreže / kontakti */}
      <section className="onama-socials">
        <h2>Kontaktirajte nas</h2>
        <div className="social-icons">
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">Instagram</a>
          <a href="#" className="social-link">Twitter</a>
          <a href="#" className="social-link">YouTube</a>
          <a href="#" className="social-link">LinkedIn</a>
        </div>
        <p className="onama-footer">
          &copy; {new Date().getFullYear()} Sportify. Sva prava zadržana.
        </p>
      </section>

      {/* 🔽 Novi deo - Slajder poznatih sportista */}
      <section className="onama-sportisti">
        <SlajderPoznatihSportista names={sportisti} />
      </section>
    </div>
  );
};

export default ONama;
