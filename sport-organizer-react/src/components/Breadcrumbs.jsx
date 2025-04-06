import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ne prikazujemo breadcrumbs na početnim stranicama
  const noBreadcrumbRoutes = ["/","/register", "/pocetna", "/pocetna-moderator"];
  if (noBreadcrumbRoutes.includes(location.pathname)) {
    return null;
  }

  // Podeli putanju na segmente
  //########################################################
  // Primer 1
  // location.pathname --> "/dogadjaji"
  // nakon split("/") metode --> ["", "dogadjaji"]
  // Falsy --> "", false, 0, undefined i null
  // Truthy --> sve sto nije falsy
  // na kraju pathnames je ["dogadjaji"]
  //########################################################
  // Primer 2
  // location.pathname --> "/dogadjaj/2"
  // nakon split("/") metode --> ["", "dogadjaj", "2"]
  // na kraju pathnames je ["dogadjaj", "2"]
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Početna ruta zavisi od tipa korisnika
  const homeRoute =
    user && user.user_type === "obican_korisnik" ? "/pocetna" : "/pocetna-moderator";

  return (
    <div className="breadcrumbs-container">
      <div className="breadcrumbs">
        <Link to={homeRoute} className="breadcrumb-link">
          Pocetna
        </Link>
        <span> </span>
        {pathnames.map((name, index) => {
          var routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          var displayName = name.charAt(0).toUpperCase() + name.slice(1);
          if(displayName === "Dogadjaji-moderator"){
            displayName = "Dogadjaji";
          } else if(displayName === "Moj-profil"){
            displayName = "Moj Profil";
          } else if(displayName === "Moje-rezervacije"){
            displayName = "Moje Rezervacije";
          } else if(displayName === "Onama"){
            displayName = "O Nama";
          } else if(displayName === "Dogadjaj"){
            displayName = "Dogadjaji ";
            routeTo = "/dogadjaji"
          }
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <span key={index} className="breadcrumb-current">
              / {displayName}
            </span>
          ) : (
            <React.Fragment key={index}>
              <span className="breadcrumb-separator"> / </span>
              <Link to={routeTo} className="breadcrumb-link">
                {displayName}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
      <button className="breadcrumb-back-btn" onClick={() => navigate(-1)}>
        Nazad
      </button>
    </div>
  );
};

export default Breadcrumbs;
