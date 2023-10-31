import React, { useState } from "react";
import "./ForgotPassword.scss";
import { Button, TextField } from "@mui/material";
import { forgotPassword } from "../../services";

function ForgotPassword({ setShowLoader }) {
  const [email, setEmail] = useState("");
  const [sendEmailText, setSendEmailText] = useState("");
  console.log("Email text:::", sendEmailText);

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

  const handleSendEmailClick = async () => {
    try {
      if (!email) {
        alert("Please Enter Email !");
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
        alert("Invalid Email !");
      } else {
        setShowLoader(true);

        const response = await forgotPassword({ email });
        console.log(response);
        if (response?.message === "Email send successfully") {
          setSendEmailText("Email send successfully");
        } else {
          setSendEmailText(response?.error);
        }
        setShowLoader(false);
      }
    } catch (err) {
      console.log("Error: ", err);
      setShowLoader(false);
      setSendEmailText("Failed to send email !");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form className="forgot-password-form">
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
            className="forgot-password-btn"
            variant="contained"
            onClick={handleSendEmailClick}
          >
            Send Email
          </Button>
          {sendEmailText && (
            <p
              className={
                sendEmailText === "Email send successfully"
                  ? "success-msg"
                  : "failure-msg"
              }
            >
              {sendEmailText}
            </p>
          )}
          <a className="link" href="/login">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
