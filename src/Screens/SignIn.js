import React, { useRef, useState } from "react";
import "./SignIn.css";
import StudentDesk from "../assets/signIn/studentsatdesk.svg";
import StudentBook from "../assets/signIn/studentonbook.svg";
import MainLogo from "../assets/signIn/mainlogo.svg";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../utils/context";
import { Link, useHistory } from "react-router-dom";

function SignIn() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
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
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Button disabled={loading} className="w-100" type="submit">
          Log In
        </Button>
      </Form>
      <TextField
        required
        id="standard-disabled"
        label="Email"
        defaultValue=""
        variant="standard"
        sx={{ width: "25em" }}
      />
      <TextField
        required
        id="standard-password-input"
        label="Password"
        type="password"
        defaultValue=""
        variant="standard"
        sx={{ width: "25em", marginTop: "1.3em" }}
      />
      <div className="login-button" onClick={() => navigate("/")}>
        <h1>Log In</h1>
      </div>
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
