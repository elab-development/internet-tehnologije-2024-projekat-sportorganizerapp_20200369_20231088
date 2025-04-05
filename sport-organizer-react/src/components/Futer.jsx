import React from "react";
import { FiMail } from "react-icons/fi";

const Futer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>© {currentYear} Sportify. Sva prava zadrzana.</p>
        <p>
          <FiMail className="mail-icon" />
          Korisnicka podrska: <a href="mailto:support@sportify.com">support@sportify.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Futer;
