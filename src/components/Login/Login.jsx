import React, { useState } from "react";
import "./Login.scss";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import signinImg from "../../assets/signin.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../../services";
import { useNavigate } from "react-router-dom";

function Login({ setShowLoader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!email || !password) {
      errorMsg = "All fields are required !";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      errorMsg = "Invalid Email !";
    }

    return errorMsg;
  };

  const handleLoginClick = async () => {
    console.log("Values:::", email, password);
    try {
      const errorMsg = checkAllFieldsValid();
      if (errorMsg) {
        alert(errorMsg);
      } else {
        setShowLoader(true);
        const payload = {
          email,
          password,
        };
        const response = await loginUser(payload);
        console.log("loginUser:::", response);
        if (response?.data?.token) {
          localStorage.setItem("userauthtoken", response?.data?.token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response?.data?._doc)
          );
          alert("Login Successful");
          navigate("/");
        } else {
          alert(response?.error);
        }
        setShowLoader(false);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowLoader(false);
      alert("Login Failed !");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <form className="login-form">
          <TextField
            label="Email"
            variant="outlined"
            className="email-input-field input-field"
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
          <div className="login-actions">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    color: "#c70039",
                    "&.Mui-checked": {
                      color: "#c70039",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <a className="link" href="/forgot-password">
              Forgot Password
            </a>
          </div>
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <a className="link" href="/signup">
            Don't have an account ? Signup
          </a>
        </form>
      </div>
      <div className="image-container">
        <img src={signinImg} alt="login" />
      </div>
    </div>
  );
}

export default Login;
