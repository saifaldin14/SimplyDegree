import React from "react";
import "./SignIn.css";
import StudentDesk from "../assets/signIn/studentsatdesk.svg";
import StudentBook from "../assets/signIn/studentonbook.svg";
import MainLogo from "../assets/signIn/mainlogo.svg";

function SignIn() {
  return (
    <>
      <img src={MainLogo} alt="main-logo" className="logo" />

      <div className="graphics">
        <img src={StudentDesk} alt="student-desk" className="student" />
        <img src={StudentBook} alt="student-book" className="student" />
      </div>

      <div className="login-button">
        <h1>Log In</h1>
      </div>
    </>
  );
}

export default SignIn;
