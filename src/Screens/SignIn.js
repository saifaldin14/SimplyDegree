import React from "react";
import "./SignIn.css";
import StudentDesk from "../assets/signIn/studentsatdesk.svg";
import StudentBook from "../assets/signIn/studentonbook.svg";
import MainLogo from "../assets/signIn/mainlogo.svg";
import { useNavigate } from "react-router-dom"; 

function SignIn() {
  let navigate = useNavigate();
  return (
    <>
      <img src={MainLogo} alt="main-logo" className="logo" />

      <div className="graphics">
        <img src={StudentDesk} alt="student-desk" className="student" />
        <img src={StudentBook} alt="student-book" className="student" />
      </div>

      <div className="login-button" onClick={() => navigate("/Home")}>
          <h1>Log In</h1>
      </div>
    </>
  );
}

export default SignIn;
