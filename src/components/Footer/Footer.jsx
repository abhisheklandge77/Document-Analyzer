import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer-container">
      <p>
        &#169; {new Date(Date.now()).getFullYear()} Document Analyzer | All
        Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
