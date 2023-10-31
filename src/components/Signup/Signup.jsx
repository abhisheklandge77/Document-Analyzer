import React, { useState } from "react";
import "./Signup.scss";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import signupImg from "../../assets/signup.svg";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerUser } from "../../services";
import { useNavigate } from "react-router-dom";

function Signup({ setShowLoader }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

  const navigate = useNavigate();

  const checkAllFieldsValid = () => {
    let errorMsg = "";

    if (!userName || !email || !password || !confirmPassword) {
      errorMsg = "All fields are required !";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      errorMsg = "Invalid Email !";
    } else if (password !== confirmPassword) {
      errorMsg = "Password and Confirm Password are not equal !";
    }

    return errorMsg;
  };

  const handleRegisterClick = async () => {
    console.log("Values:::", email, password);
    try {
      const errorMsg = checkAllFieldsValid();
      if (errorMsg) {
        alert(errorMsg);
      } else {
        setShowLoader(true);
        const payload = {
          userName,
          email,
          password,
        };
        const response = await registerUser(payload);
        console.log("registerUser::", response);
        if (response?.data?._id) {
          alert("Registration Successful");
          navigate("/login");
        } else {
          alert("Registration Failed !");
        }
        setShowLoader(false);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowLoader(false);
      alert("Registration Failed !");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <h2>Signup</h2>
        <form className="signup-form">
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
          <TextField
            label="Password"
            variant="outlined"
            className="input-field"
            type={showPassword ? "text" : "password"}
            sx={customStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            className="input-field"
            type={showPassword ? "text" : "password"}
            sx={customStyle}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="signup-btn"
            variant="contained"
            onClick={handleRegisterClick}
          >
            Register
          </Button>
          <a className="link" href="/login">
            Already have an account ? Login
          </a>
        </form>
      </div>
      <div className="image-container">
        <img src={signupImg} alt="signup" />
      </div>
    </div>
  );
}

export default Signup;
