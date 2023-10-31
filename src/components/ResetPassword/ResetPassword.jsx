import React, { useState } from "react";
import "./ResetPassword.scss";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { resetPassword } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword({ setShowLoader, setShowNavbar }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { id, token } = useParams();

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

  const handleResetClick = async () => {
    try {
      if (!password || !confirmPassword) {
        alert("All fields are required !");
      } else if (password !== confirmPassword) {
        alert("New Password and Confirm Password are not equal !");
      } else {
        setShowLoader(true);

        const payload = {
          id,
          token,
          newPassword: password,
        };

        const response = await resetPassword(payload);
        if (response?.data?._id) {
          alert("Password updated successfully");
          setShowNavbar(false);
          navigate("/login");
        } else {
          alert("Failed to reset password !");
        }
        setShowLoader(false);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowLoader(false);
      alert("Failed to send email !");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="form-container">
        <h2>Reset Password</h2>
        <form className="reset-password-form">
          <TextField
            label="New Password"
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
            className="reset-password-btn"
            variant="contained"
            onClick={handleResetClick}
          >
            Reset
          </Button>
          <a className="link" href="/login">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
