import React from "react";
import "./PageNotFound.scss";
import pageNotFoundImg from "../../assets/page-not-found.svg";

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <div className="image-container">
        <img src={pageNotFoundImg} alt="404 Page Not Found" />
      </div>
    </div>
  );
}

export default PageNotFound;
