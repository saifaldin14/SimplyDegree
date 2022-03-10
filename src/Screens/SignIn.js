import React from "react";
import "./SignIn.css";
import StudentDesk from "../assets/signIn/studentsatdesk.svg";
import StudentBook from "../assets/signIn/studentonbook.svg";
import MainLogo from "../assets/signIn/mainlogo.svg";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

function SignIn() {
  let navigate = useNavigate();
  return (
    <>
      <img src={MainLogo} alt="main-logo" className="logo"/>

      <div className="graphics">
        <img src={StudentDesk} alt="student-desk" className="student" />
        <img src={StudentBook} alt="student-book" className="student" />
      </div>
      <TextField
          required
          id="standard-disabled"
          label="Email"
          defaultValue=""
          variant="standard"
          sx={{width: '25em'}}
        />
      <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          defaultValue=""
          variant="standard"
          sx={{width: '25em', marginTop: '1.3em'}}
        />
      <div className="login-button" onClick={() => navigate("/Home")}>
          <h1>Log In</h1>
      </div>
      <h1>Not registered? <a href="/SignUp" className="sign-up">Sign Up!</a></h1>
      
    </>
  );
}

export default SignIn;
