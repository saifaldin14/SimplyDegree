import React from "react";
import "./SignIn.css"
import StudentDesk from "./Graphics/studentsatdesk.svg"
import StudentBook from "./Graphics/studentonbook.svg"
import MainLogo from "./Graphics/mainlogo.svg"

function SignIn() {
    return (
        <>
        <img src={MainLogo} alt="main-logo" className="logo"/>

        <div className="graphics">
            <img src={StudentDesk} alt="student-desk"/>
            <img src={StudentBook} alt="student-book"/>
        </div>

        <div className="login-button">
            <h1>
            Log In
            </h1>
        </div>
        </>
    );

}

export default SignIn;