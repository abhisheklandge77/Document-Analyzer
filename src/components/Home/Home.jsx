import React from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Button
        className="login-btn"
        variant="contained"
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </div>
  );
}

export default Home;
