import React from "react";
import StudentDesk from "./Graphics/studentsatdesk.svg"
import StudentBook from "./Graphics/studentonbook.svg"
import MainLogo from "./Graphics/mainlogo.svg"

function SignIn() {
    return (
        <>
        <img src={MainLogo} alt="main-logo"/>
        <img src={StudentDesk} alt="student-desk"/>
        <img src={StudentBook} alt="student-book"/>
        </>
    );

}

export default SignIn;