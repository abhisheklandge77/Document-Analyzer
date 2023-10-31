import React, { useState } from "react";
import "./UpdateProfile.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { updateUser } from "../../services";

function UpdateProfile({ setShowLoader }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);

  const customStyle = {
    "& label.Mui-focused": {
      color: "#2D3843",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#2D3843",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2D3843",
      },
    },
  };

  console.log("UserData:::", userData);

  useEffect(() => {
    if (!userData) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserData(userDetails);
    }
  }, [localStorage.getItem("userDetails")]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserName(userData?.userName);
      setEmail(userData?.email);
    }
  }, [userData]);

  const clearAllFields = () => {
    setUserName("");
    setEmail("");
  };

  const handleUpdateBtnClick = async () => {
    if (!userName || !email) {
      alert("All fields are required !");
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      alert("Invalid email address !");
    } else {
      try {
        setShowLoader(true);
        const payload = {
          userId: userData?._id,
          email,
          userName,
        };
        const response = await updateUser(payload);

        if (response?.data?._id) {
          setShowLoader(false);
          localStorage.setItem("userDetails", JSON.stringify(response?.data));
          alert("User Updated Successfully");
          clearAllFields();
          navigate("/profile");
        } else {
          setShowLoader(false);
          alert(response?.data?.error || "User Update Failed !");
          console.log("Error::::", error);
        }
      } catch (err) {
        setShowLoader(false);
        alert("User Update Failed !");
        console.log("Error::::", err);
      }
    }
  };

  return (
    <div className="update-profile-container">
      <div className="form-container">
        <h2>Update Profile</h2>
        <form className="update-profile-form">
          <TextField
            label="Name"
            variant="outlined"
            className="input-field"
            type="text"
            sx={customStyle}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            className="input-field"
            type="email"
            sx={customStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="update-profile-btn"
            variant="contained"
            onClick={handleUpdateBtnClick}
          >
            Update
          </Button>
          <a className="link" href="/profile">
            Profile
          </a>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
