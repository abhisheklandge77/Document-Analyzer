import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import AccountMenu from "../AccountMenu/AccountMenu";
import { useNavigate } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

function Navbar({ setShowNavbar, setShowLoader }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      setUserData(JSON.parse(localStorage.getItem("userDetails")));
    }
  });

  return (
    <nav className="nav-container">
      <div className="logo" onClick={() => navigate("/")}>
        <DocumentScannerIcon />{" "}
        <h2>
          Doc<span>Pro</span>
        </h2>
      </div>
      <div className="account-settings">
        <AccountMenu
          userData={userData}
          setShowNavbar={setShowNavbar}
          setShowLoader={setShowLoader}
        />
      </div>
    </nav>
  );
}

export default Navbar;
