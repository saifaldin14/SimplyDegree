import React, { useRef, useState } from "react";
import "./SignIn.css";
import StudentDesk from "../assets/signIn/studentsatdesk.svg";
import StudentBook from "../assets/signIn/studentonbook.svg";
import MainLogo from "../assets/signIn/mainlogo.svg";
import { TextField } from "@mui/material";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../utils/context";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(`Failed to log in. Error is ${e}`);
    }

    setLoading(false);
  }

  return (
    <>
      <img src={MainLogo} alt="main-logo" className="logo" />

      <div className="graphics">
        <img src={StudentDesk} alt="student-desk" className="student" />
        <img src={StudentBook} alt="student-book" className="student" />
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="email" className="mb-3">
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            style={{ width: "25em", border: "0.5px solid gray" }}
            ref={emailRef}
          />
        </Form.Group>
        <Form.Group id="password" className="mb-3">
          <Form.Control
            required
            type="password"
            placeholder="Password"
            ref={passwordRef}
            style={{
              width: "25em",
              border: "0.5px solid gray",
              marginTop: "1.3em",
            }}
          ></Form.Control>
        </Form.Group>
        <Button disabled={loading} className="login-button" type="submit">
          Log In
        </Button>
      </Form>
      <h1>
        Not registered?{" "}
        <a href="/SignUp" className="sign-up">
          Sign Up!
        </a>
      </h1>
    </>
  );
}

export default SignIn;
